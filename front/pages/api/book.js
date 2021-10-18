// export default function handler(req, res) {
//   res.status(200).json({ text: 'Hello' })
//   // const email = req.body.email
// }

// 多分、api/配下に処理を書けばフロントから検証されても見れないってのが利点なんだと思う

// http://localhost:3000/api/hello?id=でidが指定されていたら単体の情報を返す
export default async function handler(req, res){
  let data1 = "";
  if(req.query.id!=null){
    data1 = await fetch('http://localhost:3100/articles/'+req.query.id, {method: 'GET'});
  }else{
    data1 = await fetch('http://localhost:3100/articles/', {method: 'GET'});
  }
  const data2 = await data1.json();
  // ここに入れたdata2を返してる
  res.status(200).json(data2);
}

// postできそうなURL
// https://tech.chakapoko.com/nodejs/express/params.html#post%E3%81%95%E3%82%8C%E3%81%9F%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B
// reqとかresとか使って状態ごとに分岐して、book系データをpostしたりgetしたりするのが良いのかな

// https://nextjs.org/docs/api-routes/api-middlewares
// bodyParserについて記述ある。もしかして上のURLでインストールしなくても使える状態だったりする？
export async function postData(){
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

