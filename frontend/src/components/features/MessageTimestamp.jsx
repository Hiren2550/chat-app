import moment from "moment";

export const MessageTimestamp = ({ date }) => (
  <span className="text-[8px] absolute bottom-0 right-1.5">
    {date && moment(date).format("HH:mm")}
  </span>
);
