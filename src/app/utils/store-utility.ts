export class StoreUtility {

 static normalize(EntityArray: Entity[]) {
    return EntityArray.reduce((previousValue, currentValue) => {
      return {...previousValue, ...{[currentValue.id]: currentValue}}
    }, {})
  }

  static unNormalize(entities: {[id: number]: any}) {
   if (!entities) {
    return [];
   } else  {
     // @ts-ignore
     return Object.keys(entities).map(key => entities[key]);
   }
  }

  static filterDuplicateIds(ids: number[]) {
    return ids.filter((elem, index, self) => index === self.indexOf(elem));
  }

  static removeKey(entities: {[id: number]: any}, id: any) {
    const newObj = {...entities}
    // @ts-ignore
    delete newObj[id]
    return newObj;
  }

}

interface Entity {
  id: any;
}
