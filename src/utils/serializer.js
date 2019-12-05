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
