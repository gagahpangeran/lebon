import uniqBy from "lodash-es/uniqBy";
import startCase from "lodash-es/startCase";

function uriToString(str) {
  return str.replace("http://lebon.netlify.com/", "").replace(/_/g, " ");
}

export function serialize(data) {
  if (data === null) {
    return null;
  }

  const result = data.map(({ subject }) => ({
    url: subject.value,
    title: data.find(
      ({ subject: s, predicate: p }) =>
        s.value === subject.value &&
        p.value === "http://lebon.netlify.com/fullName"
    ).object.value,
    props: data
      .filter(({ subject: s }) => s.value === subject.value)
      .map(({ predicate: p, object: o }) => ({
        pred: startCase(uriToString(p.value)),
        obj: uriToString(o.value)
      }))
  }));

  return uniqBy(result, "title");
}
