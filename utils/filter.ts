import { Category } from "~/graphqlTypes";
export function createFilterSpec(filterData: any) {
  // console.log(filterData);
  const spec: any = { gender: null, collection: null };
  if (filterData.category != undefined || filterData.categories != undefined) {
    spec.categories = [];
  }
  if (
    filterData.collection != undefined ||
    filterData.collections != undefined
  ) {
    spec.collections = [];
  }
  if (filterData.attributes != undefined) {
    const attrs: any = {};
    filterData.attributes.map((val: any, idx: number) => {
      attrs[val.slug] = [];
    });
    spec.attributes = attrs;
  }
  spec.isPublished = true;
  // console.log(spec);
  return spec;
}

export function createGQLProductFilter(filterData: any) {
  const spec: any = {};
  Object.keys(filterData).map((k: string) => {
    const v = filterData[k];
    if (k === "categories") {
      const cats = v.flat();

      if (cats.length === 0 && filterData.gender !== null) {
        cats.push(filterData.gender);
      }
      if (cats.length > 0) {
        spec[k] = cats;
      }
    } else if (k === "collections") {
      if (v.length === 0 && filterData.collection !== null) {
        v.push(filterData.collection);
      }
      if (v.length > 0) {
        spec[k] = v;
      }
    } else if (v !== null && typeof v === "object") {
      if (Object.entries(v).length > 0) {
        if (k === "attributes") {
          const attrList: any[] = [];
          Object.keys(v).map((key: string) => {
            if (v[key].length > 0) {
              attrList.push({ slug: key, values: v[key] });
            }
          });
          if (attrList.length > 0) {
            spec[k] = attrList;
          }
        } else {
          spec[k] = v;
        }
      }
    } else if (k !== "gender" && v !== null) {
      spec[k] = v;
    }
  });
  spec.isPublished = true;
  return spec;
}

export function processFilterValue(
  filterValue: any,
  filterData: any,
  pageType: string
) {
  if (filterValue === null || filterValue === undefined) {
    if (pageType === "category" || pageType === "gender") {
      return {
        categories: [filterData.category.id],
      };
    } else if (pageType === "collection") {
      return {
        collections: [filterData.collection.id],
      };
    } else {
      return {};
    }
  }
  const data = createGQLProductFilter(filterValue);
  if (data.categories === undefined) {
    if (
      (pageType === "category" || pageType === "gender") &&
      filterData.category !== undefined
    ) {
      data.categories = [filterData.category.id];
    }
  }
  if (data.collections !== undefined) {
    if (pageType === "collection" && filterData.collection !== undefined) {
      data.collections = [filterData.collection.id];
    }
  }
  return data;
}

export function createCategoryTree(categories: Category[]) {
  const tree: any = {};
  for (let idx = 0; idx < categories.length; idx++) {
    const category = categories[idx];
    if (category.level === 0) {
      if (tree[category.slug] === undefined) {
        tree[category.slug] = category;
      }
    } else if (category.parent) {
      const parent = category.parent;
      if (parent.level === 0) {
        if (tree[parent.slug] === undefined) {
          tree[parent.slug] = parent;
          tree[parent.slug].children = [];
        } else {
          if (
            tree[parent.slug].children.findIndex((obj: any) => {
              return obj.slug === category.slug;
            }) === -1
          ) {
            tree[parent.slug].children.push(category);
          }
        }
      } else {
        if (parent.ancestors) {
          const ancestors = (parent.ancestors?.edges as any).sort(
            (a: Category, b: Category) => {
              return a.level - b.level;
            }
          );
          let root: string | null = null;
          for (let aidx = 0; aidx < ancestors.length; aidx++) {
            const ancestor = ancestors[aidx];

            if (ancestor.level === 0) {
              if (tree[ancestor.slug] === undefined) {
                tree[ancestor.slug] = ancestor;
                tree[ancestor.slug].children = [];
                if (parent.level === 1) {
                  if (
                    tree[ancestor.slug].children.findIndex((obj: any) => {
                      return obj.slug === parent.slug;
                    }) === -1
                  ) {
                    tree[ancestor.slug].children.push(parent);
                  }
                }
                root = ancestor.slug;
              }
            } else if (ancestor.level === 1 && root) {
              if (
                tree[root].children.findIndex((obj: any) => {
                  return obj.slug === parent.slug;
                }) === -1
              ) {
                tree[root].children.push(parent);
              }
            }
          }
        }
      }
    }
  }
  return Object.keys(tree)
    .sort()
    .map((k: string) => {
      return tree[k];
    });
}
