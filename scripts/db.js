const { exec, spawn } = require("child_process");
const { promisify } = require("util");
const execPromise = promisify(exec);
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

function handleResult(res) {
  console.error(res.stderr);
  return res.stdout.replace(/\s$/, "");
}

function printResult(res) {
  console.log(handleResult(res));
}

function select_database(alias) {
  if (alias === "production") {
    return "k42un0k0blog_production";
  } else if (alias === "develop") {
    return "k42un0k0blog_develop";
  } else if (alias === "test") {
    return "k42un0k0blog_test";
  }
  throw new Error(
    "got unknown databse. select databse from production, develop or test."
  );
}

async function get_container_name() {
  const res = await execPromise(
    "docker-compose ps db | awk '$0=$1' | sed -n '3p'"
  );
  return handleResult(res);
}

async function create_database(db_name) {
  const res = await execPromise(
    `docker exec -i ${await get_container_name()} mysql -uroot -pexample <<EOF
CREATE DATABASE IF NOT EXISTS ${db_name};
EOF`
  );
  printResult(res);
}

async function migrate(...args) {
  const db_name = select_database(args.slice(0, 1)[0]);
  await create_database(db_name);
  spawn(
    "docker-compose",
    [
      "run",
      "--rm",
      "app",
      "migrate",
      "-path",
      "./migrations",
      "-database",
      `mysql://root:example@tcp(db:3306)/${db_name}`,
      ...args.slice(1),
    ],
    { stdio: "inherit" }
  );
}

async function seed(...args) {
  const db_name = select_database(args.slice(0, 1)[0]);
  for (let file of args.slice(1)) {
    console.log(`exec ${file}`);
    const res = await execPromise(
      `docker exec -i ${await get_container_name()} mysql -uroot -pexample ${db_name} < ${file}`
    );
    printResult(res);
  }
}

async function create_migrations(...args) {
  const dockerCompose = spawn(
    "docker-compose",
    [
      "run",
      "--rm",
      "app",
      "migrate",
      "create",
      "-ext",
      "sql",
      "-dir",
      "migrations",
      ...args,
    ],
    { stdio: "inherit" }
  );
  const whoami = handleResult(await execPromise("whoami"));
  dockerCompose.on("close", () => {
    spawn("sudo", ["chown", `${whoami}:${whoami}`, "./back/migrations/*"], {
      stdio: "inherit",
      shell: true,
    });
  });
}

create_migrations(...hideBin(process.argv));
