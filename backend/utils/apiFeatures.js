//Constructor for Search Filter and pagination

export class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.search;

    const name = {
      $regex: keyword,
      $options: "i",
    };

    keyword
      ? (this.query = this.query.find({ name }))
      : (this.query = this.query.find());
    return this;
  }

  filter() {
    //Making Copy of All Query
    const queryStrD = { ...this.queryStr };
    //Deleting all fields mention in variabe keywords
    const keywords = ["search", "page", "limit"];
    keywords.forEach((keyword) => {
      delete queryStrD[keyword];
    });

    //Filter for Price And Rating

    let changingQueryStr = JSON.stringify(queryStrD);
    changingQueryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(changingQueryStr));
    console.log("changingQueryStr:", changingQueryStr);

    return this;
  }
}
