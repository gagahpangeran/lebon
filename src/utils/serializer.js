export function serializeResultKeyword(data) {
  if (data === null) {
    return null;
  }

  const result = data.map(({ subject, fullName }) => ({
    url: subject.value.replace("http://lebon.netlify.com", ""),
    name: fullName.value
  }));

  return result.sort(({ name: name1 }, { name: name2 }) =>
    name1 < name2 ? -1 : 1
  );
}
