import coverBg from "../assets/cover-bg.jpg";
import "../styles/components/hilight.css";

interface Props {
  title: string;
}

export const Hilight = ({ title }: Props) => {
  return (
    <div className="hilight">
      <h1 className="title">{title}</h1>
      <div className="fade"></div>
      <div className="bg">
        <img src={coverBg} alt="" />
      </div>
    </div>
  );
};
