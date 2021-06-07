/** @jsxImportSource theme-ui */

import { Skelton } from '../components/skelton';
import { flex } from '../components/styles/utils';

function Home(): JSX.Element {
  return (
    <main>
      <Skelton style={{ height: 200, width: 200 }} />

      <div sx={{ height: '100vh', display: 'flex' }}>
        <div sx={{ ...flex.grow }}></div>
        <div sx={{ ...flex.grow }}>
          <h3
            sx={{
              textTransform: 'capitalize',
            }}
          >
            recent posts
          </h3>
          <ul>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              return <li key={i}>aaa</li>;
            })}
          </ul>
        </div>
      </div>
      <div sx={{ height: '100vh' }}>
        <h3
          sx={{
            textTransform: 'capitalize',
          }}
        >
          pick up!
        </h3>
        <div>
          <div>aaa</div>
          <ul sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              return (
                <li key={i} sx={{ flex: '0 0 50%' }}>
                  aaa
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <h4>運営について</h4>
      </div>
    </main>
  );
}

export default Home;
