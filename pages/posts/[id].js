import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) { //こいつが次に動く。だからparamにIDが渡せる
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

// 元々あるmdページのパスを取得する→サーバで予め静的生成で対応できる→ページ表示後の動きがサクサク
export async function getStaticPaths() { //こいつが最初に動いて
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <p>これはマークダウンのページのすべてに表示される文字</p>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}