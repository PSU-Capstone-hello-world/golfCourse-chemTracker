import axios from "axios";
//import Component from "react";
let API_KEY = "API key go here";

class Backend {
  constructor() {
    this.api_key = API_KEY;
  }
  async getDateRangeName(start, end, name) {
    const body = {
      mode: "name_date",
      queryStringParameters: {
        start: start,
        end: end,
        productName: name,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getByName(name) {
    const body = {
      mode: "name",
      queryStringParameters: {
        name: name,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getByMonth(month) {
    const body = {
      mode: "month",
      queryStringParameters: {
        month: month,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getByMonthDate(start, end, month) {
    const body = {
      mode: "month_date",
      queryStringParameters: {
        start: start,
        end: end,
        month: month,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getTargetDate(start, end, target) {
    const body = {
      mode: "target_date",
      queryStringParameters: {
        start: start,
        end: end,
        target: target,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getTarget(target) {
    const body = {
      mode: "target",
      queryStringParameters: {
        target: target,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getNameTargetDate(start, end, nameTarget) {
    const body = {
      mode: "name_target_date",
      queryStringParameters: {
        start: start,
        end: end,
        name_target_date: nameTarget,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async getNameTarget(target, name) {
    const body = {
      mode: "name_target",
      queryStringParameters: {
        target: target,
        name: name,
      },
    };
    const response = await axios.post(
      "https://c7fjg6xclk.execute-api.us-west-2.amazonaws.com/beta/id",
      body
    );
    return JSON.parse(response.data["body"]);
  }
  async put(document) {}
  async getDocFromImage(image) {}
  async getItem() {}
  async update(id, document) {
    // in development
  }
}

export default Backend;
