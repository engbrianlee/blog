import tinytime from "tinytime";
import Link from "next/link";
import Head from "next/head";
import getAllPostPreviews from "@/getAllPostPreviews";
import twitterCard from "@/img/twitter-card.jpg";
import SectionContainer from "@/components/SectionContainer";
import Footer from "@/components/Footer";
import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "@/css/theme";

const posts = getAllPostPreviews();

export default function Home() {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className="divide-y divide-gray-200">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@engbrianlee" />
        <meta name="twitter:creator" content="@engbrianlee" />
        <meta name="twitter:title" content="ebl blog" />
        <meta name="twitter:description" content="ebl blog" />
        <meta
          name="twitter:image"
          content={`https://blog.engbrianlee.vercel.app${twitterCard}`}
        />
        <meta property="og:url" content="https://blog.engbrianlee.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ebl blog" />
        <meta property="og:description" content="ebl blog" />
        <meta
          property="og:image"
          content={`https://blog.engbrianlee.vercel.app${twitterCard}`}
        />
        <title>ebl blog</title>
      </Head>
      <div></div>
      <ul className="divide-y divide-gray-200">
        {posts.map(({ link, module: { default: Component, meta } }) => {
          return (
            <li key={link} className="py-12">
              <article className="space-y-2">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd
                    className={classNames(
                      "text-base font-medium leading-6",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}
                  >
                    <time dateTime={meta.date}>
                      {tinytime("{MMMM} {DD}, {YYYY}").render(
                        new Date(meta.date)
                      )}
                    </time>
                  </dd>
                </dl>
                <div className="space-y-5">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold leading-8 tracking-tight">
                      <Link href={link}>
                        <a
                          className={
                            isDarkMode ? "text-white" : "text-gray-900"
                          }
                        >
                          {meta.title}
                        </a>
                      </Link>
                    </h2>
                    <div
                      className={classNames("prose lg:prose-lg", {
                        "prose-dark": isDarkMode,
                      })}
                    >
                      <Component />
                    </div>
                  </div>
                  <div className="text-base font-medium leading-6">
                    <Link href={link}>
                      <a
                        className="text-pink-500 hover:text-pink-600"
                        aria-label={`Read "${meta.title}"`}
                      >
                        Read more &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      <SectionContainer>
        <Footer className="py-10" />
      </SectionContainer>
    </div>
  );
}
