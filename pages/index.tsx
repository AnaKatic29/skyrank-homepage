import Head from 'next/head';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { HomePageQuery } from 'lib/queries';
import { client } from 'lib/client';
import { buildExternalLink } from 'lib/utils';

import type { HomepageContent } from 'lib/types';
import type { InferGetStaticPropsType, NextPage } from 'next';
import mypic from '../Group 3 (13).png'
import mypic2 from '../Group 4 (8).png'

export const getStaticProps = async () => {
  const { data } = await client.query({ query: HomePageQuery });

  const content: HomepageContent = data.homepages[0];

  return {
    props: {
      content,
    },
    revalidate: 10,
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
}) => {
  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content?.metaDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-20" style={{minHeight: 600, background: 'linear-gradient(78.38deg, #131526 4.19%, #0F5874 72.79%, #0080A8 98.23%)'}}>
        <h1 className="text-center m-auto max-w-xl" style={{ color: 'white', position: 'absolute', alignContent: 'flex-end', textAlign: 'left', marginLeft: '8rem', maxWidth: '25rem' }} >{content.heading}</h1>
        <p className="text-center my-3" style={{ color: 'white', position: 'absolute', alignContent: 'flex-end', textAlign: 'left', marginLeft: '8rem', marginTop: '15rem', maxWidth: '25rem' }}>
          Improve your rankings. Increase your revenue.
        </p>
        <div className="flex justify-center my-6" style={{ color: 'white', position: 'absolute', alignContent: 'flex-end', textAlign: 'left', marginLeft: '8rem', marginTop: '20rem', maxWidth: '25rem' }}>
          <a
            href={buildExternalLink('register/')}
            className="m-1 btn btn-primary font-bold"
          >
            Sign Up FREE
          </a>
          <a href="mailto:support@skyrank.io" className="btn m-1 font-bold">
            Get In Touch
          </a>
        </div>

        <div style={{ alignContent: 'center', alignItems: 'center', objectPosition: 'center-top', marginLeft: '40rem' }}>
          <Image
            src={mypic}
            alt="Picture of the author"
            width="770.62px"
            height="449px"
          />
        </div>
      </div>
      <div>
        <div className="max-w-6xl m-auto">
          <h2 className="text-center" style={{ color: 'black', marginTop: '2rem' }}>{content.punchline}</h2>
        </div>
        <section className="my-8">
          <div style={{ background: '#CCCCCC' }} className="carousel carousel-center justify-center">
            {content.publishers.map(({ id, url }) => (
              <div key={id} className="carousel-item mx-2">
                <Image
                  src={url}
                  alt="Publisher"
                  layout="fixed"
                  width={215}
                  height={215}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
      <div>
        <div className="mb-6" style={{ margin: 40, color: 'black' }}>
          {content.sections.map(({ id, heading, content }) => (
            <section key={id} className="m-auto max-w-6xl">
              <h3 className="mb-2">{heading}</h3>
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => <p className="my-4" {...props} />,
                  ul: ({ node, ...props }) => (
                    <span className="flex flex-col" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <span className="md:pl-4" {...props}>
                      <p>➜ {(node?.children?.[0] as any)?.value} </p>
                    </span>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
