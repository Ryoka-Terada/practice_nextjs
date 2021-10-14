// export default function handler(req, res) {
//   res.status(200).json({ text: 'Hello' })
//   // const email = req.body.email
// }
import book from '../../datas/data.json'

// export const books = 

export default function handler(req, res) {
  if(req.method == "GET"){
    res.status(200).json(
      {
        book
      }
    )
  }else if(req.method == "POST"){
    res.status(200).json(
      {
         message: `you pushed post`,
         post: req.query.id,
         books
      }
    )
  }
}

// export default ({ query: { word } }, res) => {
//   res.status(200).json({ message: `you requested for ${word} ` });
//  };



// res.status(200).json({ post: req.query.id, comments })
