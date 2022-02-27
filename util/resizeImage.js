let resizeImage = (width, body) => {
  let regex = new RegExp('<img')
  if(regex.test(body)){
    body = body.replace(/<img/g, '<img className="max-w-lg')
    return body
  } else {
    return body;
  }
}

export default resizeImage;