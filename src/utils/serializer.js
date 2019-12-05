import uniqBy from "lodash-es/uniqBy";
import startCase from "lodash-es/startCase";

function uriToString(str) {
  if (str.includes("http://lebon.netlify.com")) {
    return startCase(
      str.replace("http://lebon.netlify.com/", "").replace(/_/g, " ")
    );
  }

  return str;
}

export function serializeResultKeyword(data) {
  if (data === null) {
    return null;
  }

  const result = data.map(({ subject, fullName, field, motivation }) => ({
    url: subject.value.replace("http://lebon.netlify.com", "/page"),
    name: fullName ? fullName.value : "-",
    field: field ? field.value : "-",
    motivation: motivation ? motivation.value : "-"
  }));

  return result.sort(({ name: name1 }, { name: name2 }) =>
    name1 < name2 ? -1 : 1
  );
}

export function serializeResultURI(data) {
  if (data === null) {
    return null;
  }

  const result = uniqBy(
    data
      .map(({ p, o }) => ({
        pred: uriToString(p.value),
        obj: uriToString(o.value)
      }))
      .map(({ pred }, _, arr) => ({
        pred: pred,
        obj: arr
          .filter(({ pred: p }) => p === pred)
          .map(({ obj: o }) => o)
          .join(", ")
      })),
    "pred"
  );

  const name = result.find(({ pred }) => pred === "Full Name");
  const thumbnail = result.find(({ pred }) => pred === "thumbnail");

  const finalResult = {
    name: name.obj,
    thumbnail: thumbnail && thumbnail.obj,
    data: result
      .filter(({ pred }) => pred !== "thumbnail" && !pred.includes("http://"))
      .map(({ pred, obj }) => ({ pred: startCase(pred), obj }))
      .sort(({ pred: p1 }, { pred: p2 }) => (p1 < p2 ? -1 : 1))
  };

  return finalResult;
}
