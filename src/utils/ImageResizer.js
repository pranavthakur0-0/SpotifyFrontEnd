export function orignalThumbnail(path) {
    const optimizedPath = path.replace('/sizeAdjust/', '/f_auto,q_auto/');
    return optimizedPath;
  }
  
export function listThumbnail(path) {
    const optimizedPath = path.replace('/sizeAdjust/', '/c_fill,h_100,w_100/');
    return optimizedPath;
}

export function playlistThumbnail(path) {
    const optimizedPath = path.replace('/sizeAdjust/', '/c_fill,h_500,w_500/');
    return optimizedPath;
}
  

