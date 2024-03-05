export interface IGraphData {
  month: string;
  numberOfActiveUsers: number;
  numberOfCheckouts: number;
}

export class GraphData implements IGraphData {
  month: string;
  numberOfActiveUsers: number;
  numberOfCheckouts: number;

  constructor(graphData: IGraphData) {
    this.month = graphData.month;
    this.numberOfActiveUsers = graphData.numberOfActiveUsers;
    this.numberOfCheckouts = graphData.numberOfCheckouts;
  }
}
