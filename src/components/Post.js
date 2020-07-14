import Head from "next/head";
import PageTitle from "@/components/PageTitle";
import tinytime from "tinytime";
import Link from "next/link";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";
import Footer from "./Footer";
import classNames from "classnames";
import { useContext } from "react";
import ThemeContext from "@/css/theme";

const mdxComponents = {
  pre: ({ className, ...props }) => (
    <pre
      className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`}
      {...props}
    />
  ),
  "pre.code": ({ className, ...props }) => (
    <code className={`${className} text-gray-200`} {...props} />
  ),
  // blockquote: ({ className, ...props }) => (
  //   <blockquote
  //     className={`${className} border-l-4 border-r-4 px-2 shadow-xs text-center text-lg`}
  //     {...props}
  //   />
  // ),
};

export default function Post({ meta, children, posts }) {
  const router = useRouter();
  const postIndex = posts.findIndex((post) => post.link === router.pathname);
  const previous = posts[postIndex + 1];
  const next = posts[postIndex - 1];

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <article className="divide-y divide-gray-200">
      <Head>
        <title>{meta.title} – ebl blog</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@engbrianlee" />
        <meta name="twitter:creator" content="@engbrianlee" />
        <meta name="twitter:title" content={`${meta.title} – ebl blog`} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image"
          content={`https://blog.engbrianlee.vercel.app${meta.image}`}
        />
        <meta
          property="og:url"
          content={`https://blog.engbrianlee.vercel.app${router.pathname}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} – ebl blog`} />
        <meta property="og:description" content={meta.description} />
        <meta
          property="og:image"
          content={`https://blog.engbrianlee.vercel.app${meta.image}`}
        />
      </Head>
      <header className="pb-5 lg:pt-6 lg:pb-10">
        <div className="space-y-1 text-center">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd
                className={classNames(
                  "text-base font-medium leading-6",
                  isDarkMode ? "text-gray-300" : "text-gray-500"
                )}
              >
                <time dateTime={meta.date}>
                  {tinytime("{dddd}, {MMMM} {DD}, {YYYY}").render(
                    new Date(meta.date)
                  )}
                </time>
              </dd>
            </div>
          </dl>
          <div>
            <PageTitle>{meta.title}</PageTitle>
          </div>
        </div>
      </header>
      <div className="divide-y divide-gray-200">
        <div>
          <div
            className={classNames(
              "py-4 mx-auto lg:py-10 prose lg:prose-lg xl:prose-xl",
              {
                "prose-dark": isDarkMode,
              }
            )}
          >
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </div>
        </div>
        <footer className="space-y-6 text-sm font-medium leading-5 py-7">
          <Link href="/">
            <a className="tracking-wide text-pink-500 uppercase hover:text-pink-600">
              ← Back to all posts
            </a>
          </Link>
          {
            <div className="space-y-4 xl:space-y-0 xl:grid xl:grid-cols-3 xl:justify-center xl:items-center">
              {previous && (
                <div>
                  <h2
                    className={classNames(
                      "text-xs tracking-wide uppercase",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}
                  >
                    Previous Article
                  </h2>
                  <div className="text-pink-500 hover:text-pink-600">
                    <Link href={previous.link}>
                      <a>{previous.title}</a>
                    </Link>
                  </div>
                </div>
              )}
              <Footer className="hidden col-start-2 xl:block" />
              {next && (
                <div style={{ justifySelf: "end" }}>
                  <h2
                    className={classNames(
                      "text-xs tracking-wide uppercase",
                      isDarkMode ? "text-gray-300" : "text-gray-500"
                    )}
                  >
                    Next Article
                  </h2>
                  <div className="text-pink-500 hover:text-pink-600">
                    <Link href={next.link}>
                      <a>{next.title}</a>
                    </Link>
                  </div>
                </div>
              )}
              <Footer className="pt-4 xl:hidden" />
            </div>
          }
        </footer>
      </div>
    </article>
  );
}
