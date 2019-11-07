// Source: https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
const isArray = a => {
  return Array.isArray(a);
};

const isObject = o => {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

const toCamel = s => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '').replace('_', '');
  });
};

const toSnake = (s) => {
  return s.replace( /([A-Z])/g, "_$1").toLowerCase();
}

export const keysSnakeToCamel = o => {
  if (isObject(o)) {
    const n = {};
    Object.keys(o).forEach((k) => {
        n[toCamel(k)] = keysSnakeToCamel(o[k]);
      });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysSnakeToCamel(i);
    });
  }
  return o;
}

export const keysCamelToSnake = o => {
  if (isObject(o)) {
    const n = {};
    Object.keys(o).forEach((k) => {
        n[toSnake(k)] = keysCamelToSnake(o[k]);
      });
    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysCamelToSnake(i);
    });
  }
  return o;
}