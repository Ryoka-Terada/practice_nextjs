# このプロジェクトについて
Next.jsをメインに使っています。APIモックとしてJSON Serverを動かします。

nextjs-blog/<br>
  ├api/jsonServer/<br>
  │  └db.json<br>
  └front/<br>

プロジェクトを起動するには、Next.jsとJSON Serverを別々に起動する必要がある。

# 動かし方
コマンドツールで以下(初回のみ)

$ git clone https://github.com/Ryoka-Terada/practice_nextjs.git

nextjs-blog/front/で以下

$ npm run dev

>'next' は、内部コマンドまたは外部コマンド、操作可能なプログラムまたはバッチ ファイルとして認識されていません。

npm run devでこれが表示されたら以下

$ npm install

(理由はgitignoreにnode_moduleが入っているため上記エラーが出る。npm installで必要なものを全てインストールしてくれる？)

nextjs-blog/api/jsonServer/ に移動して以下

$ npm bin

ここで出たパスをメモ

$ [npm binでメモしたパス]/json-server --watch db.json --port 3100

localhost:3000 を表示する。

<br><br>
This is a starter template for [Learn Next.js](https://nextjs.org/learn).