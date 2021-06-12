import { VideoState } from "../constants";

const state: VideoState = {
  videoList: [],
  params: {
    page: 1,
    limit: 9,
    title: '',
  },
  videoDetail: null,
  total: 0
};

export default state;
