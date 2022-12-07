import { LooseObject } from './../interfaces/generic';
const pick = (object: LooseObject, keys: Array<string>) => {
  return keys.reduce((obj: LooseObject, key: string) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
};

export default pick;
