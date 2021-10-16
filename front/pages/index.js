import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

// 多分async系はすべてserver-side onlyで動くからここにconsole.logしてもブラウザで実行されない
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

// propsは特殊なのかも。普通のasyncをfunctionから読んだら呼べたし
export async function getData(){
  const data1 = await fetch('http://localhost:3100/articles/', {method: 'GET'});
  // .then(res => res.json()).then(console.log);
  const data2 = await data1.json();
  const data3 = data2.map((index)=>{return index.title});
  console.log(data3);
  return data3;
}

export async function postData(apiName){
  const response = await fetch(`http://localhost:3100/articles/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "title": "最後にして最初のアイドル",
      "author": "草野原々"
    })
  });
  const data = await response.json();
  console.log(data);
}

export default function Home({ allPostsData }) {
  const [count, setCount] = useState(0);
  const [book, setBook] = useState([]);
  const [query, setQuery] = useState('redux');
  const [dummy, setDummy] = useState('');
  // useEffectは一番最初しか動かない？
  useEffect(()=>{
    (async () => {
      console.log("useEffect起動");
      const data1 = await fetch('http://localhost:3100/articles/', {method: 'GET'});
      const data2 = await data1.json();
      setBook(data2);
      console.log(data2);
    })()
  },[]) // 第二引数に[]を渡さないとコンポーネント更新ごとに(自動バッチがあるため毎秒)データを取得しに行ってしまうらしい
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/* test */}
      <button onClick={() => setCount(count + 1)}>
        Click me{count}
      </button>
      {book.map(({ id, title, author }) => (
        <dev>
          <p>
            {id} <b>{title}</b> {author}
          </p>
        </dev>
      ))}
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setDummy(book)}>
        setDummy{dummy}
      </button>
      {/* test */}

      <section className={utilStyles.headingMd}>
        <button onClick={()=>getData()}>get data on console</button>
        <button onClick={()=>postData()}>post data</button>
        <p>こんにちは。これは9月20日から寺田が作っているNext.jsチュートリアルの画面です。</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, tmp }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}