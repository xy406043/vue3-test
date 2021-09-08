export function isEmptyObj(obj: any) {
  if (!obj) return true;
  if (typeof obj === 'object') {
    return !Object.keys(obj).length;
  }
  return true;
}

export const setDocumentTitle = function (title: string) {
  document.title = title;
  const ua = navigator.userAgent;
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/;
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  }
};

export const domTitle = '美乐蒂';
