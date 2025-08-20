export const getVisitorId = () => {
    const key = "visitorId";
    let v = localStorage.getItem(key);
    if (!v) {
      v = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
      localStorage.setItem(key, v);
    }
    return v;
  };
  