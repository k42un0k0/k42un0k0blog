import Link from 'next/link';
import { pagesPath } from '../../lib/$path';
import { sticky, flex } from '../../lib/styles/constants';
import { createStyles, sequence } from '../../lib/styles/lib';
import { withLayout } from '../../modules/layout';
import { useMockApi } from '../../modules/mockapi/useMockApi';
import { Skeleton } from '../../modules/skeleton';

const styles = createStyles({
  root: { maxWidth: 1400, margin: 'auto' },
  recents: { paddingTop: 100 },
  recents_latest: {
    ...sequence([
      { display: 'block' },
      { display: 'inline-block', width: '55%', ...sticky.top },
      { display: 'inline-block', width: '55%', ...sticky.top },
    ]),
    verticalAlign: 'top',
  },
  recents_latest_thumbnail: { height: 600 },
  recents_latest_body: {
    margin: '1em auto',
  },
  recents_list: {
    paddingLeft: 100,
    ...sequence([
      { display: 'block' },
      { display: 'inline-block', width: '45%' },
      { display: 'inline-block', width: '45%' },
    ]),
  },
  pickup_content: {
    margin: 'auto',
  },
  pickup_pickup: {
    height: 400,
  },
  pickup_list: {
    marginTop: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
  pickup_list_item: {
    flex: ['0 0 100%', '0 0 50%', `0 0 ${100 / 3}%`],
  },
  about_content: {
    display: 'flex',
  },
  about_text: {
    flex: '0 0 45%',
    marginRight: '5%',
  },
  about_image: {
    height: 100,
  },
  article: { display: ['block', 'flex', 'flex'], padding: 10 },
  article_image: { height: 120, width: 120, flex: '0 0 auto' },
  article_text: { width: '80%', margin: 10 },
  article_title: { height: 20 },
  article_body: { marginTop: 20 },
  article_body__skeleton: { height: 60 },
  head: { textTransform: 'capitalize' },
});

export default withLayout(function Home(): RenderReturnType {
  const recents = useMockApi({
    latest: { title: 'title', body: 'body' },
    list: [{ title: 'title', body: 'body' }],
  });
  const pickup = useMockApi({
    pickup: { title: 'title', body: 'body' },
    list: [{ title: 'title', body: 'body' }],
  });
  return (
    <main sx={styles.root}>
      <div sx={styles.recents}>
        <div sx={styles.recents_latest}>
          <Skeleton sx={styles.recents_latest_thumbnail} />
          <div sx={styles.recents_latest_body}>
            <Skeleton sx={{ height: 50 }} body={recents.data?.latest.title} />
          </div>
        </div>
        <div sx={styles.recents_list}>
          <h3 sx={styles.head}>recent posts</h3>
          <ul>
            {[...Array(9).keys()].map((i) => {
              return (
                <Link key={i} href={pagesPath.blogs._id(i).$url()}>
                  <li key={i} sx={styles.article}>
                    <Skeleton sx={styles.article_image} />
                    <div sx={styles.article_text}>
                      <div>
                        <Skeleton sx={styles.article_title} body={recents.data?.latest.title} />
                      </div>
                      <div sx={styles.article_body}>
                        <Skeleton sx={styles.article_body__skeleton} body={recents.data?.latest.body} />
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <div sx={styles.pickup_content}>
          <h3 sx={styles.head}>pick up!</h3>
          <div>
            <Skeleton sx={styles.pickup_pickup}></Skeleton>
            <ul sx={styles.pickup_list}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                return (
                  <li key={i} sx={{ ...styles.article, ...styles.pickup_list_item }}>
                    <Skeleton sx={styles.article_image} />
                    <div sx={styles.article_text}>
                      <div>
                        <Skeleton sx={styles.article_title} body={pickup.data?.pickup.title} />
                      </div>
                      <div sx={styles.article_body}>
                        <Skeleton sx={styles.article_body__skeleton} body={pickup.data?.pickup.body} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h4>運営について</h4>
        <div sx={styles.about_content}>
          <div sx={{ ...flex.grow, ...styles.about_text }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <Skeleton sx={{ ...flex.grow, ...styles.about_image }} />
        </div>
      </div>
    </main>
  );
});
