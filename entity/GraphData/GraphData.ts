export interface IGraphData {
  month: string;
  noOfActiveUsers: number;
  noOfCheckouts: number;
}

export class GraphData implements IGraphData {
  month: string;
  noOfActiveUsers: number;
  noOfCheckouts: number;

  constructor(graphData: IGraphData) {
    this.month = graphData.month;
    this.noOfActiveUsers = graphData.noOfActiveUsers;
    this.noOfCheckouts = graphData.noOfCheckouts;
  }
}
