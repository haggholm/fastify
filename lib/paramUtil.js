function setProperty(ob, path, value) {
  if (path.length === 1) {
    ob[path] = value;
  } else {
    const key = path[0];
    if (!(key in ob)) ob[key] = {};
    setProperty(ob[key], path.slice(1), value);
  }
}

export function mergeDeepObjectParam(ob, name) {
  for (const key of Object.keys(ob)) {
    if (!key.startsWith(`${name}[`)) {
      continue;
    }

    const rest = key.substr(name.length);
    if (/^(\[\w+])+/.test(rest)) {
      const keys = rest
        .substr(0, rest.length - 1)
        .split("]")
        .map((s) => s.substr(1));
      setProperty(ob, [name, ...keys], ob[key]);
      delete ob[key];
    }
  }
}
