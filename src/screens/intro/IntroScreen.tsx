import { useGame } from "../../game/GameContext";
import { AppShell, PrimaryAction } from "../../components/common";
import "./IntroScreen.css";

export function IntroScreen() {
  const { dispatch } = useGame();

  const handleBegin = () => {
    dispatch({ type: "BEGIN" });
  };

  return (
    <AppShell>
      <div className="nha-intro-content">
        <div className="nha-intro-narrative">
          <p>
            Gia đình giống như một ngôi nhà. Nó không tự nhiên sinh ra vững chãi, mà được định hình bởi từng quyết định của những người sống bên trong.
          </p>
          <p>
            Hôm nay, bạn sẽ đứng trước 7 tình huống phổ biến trong đời sống gia đình. Mỗi lựa chọn của bạn sẽ tác động trực tiếp lên:
          </p>
          <ul>
            <li>Nền tảng kinh tế</li>
            <li>Chăm sóc, giáo dục</li>
            <li>Bình đẳng giới</li>
            <li>Kết nối tình cảm</li>
          </ul>
        </div>

        <div className="nha-how-to-play">
          <p><strong>Cách chơi:</strong></p>
          <ol>
            <li>Đọc tình huống và chọn cách giải quyết. (Chỉ được chọn 1 lần)</li>
            <li>Quan sát ngôi nhà thay đổi ra sao.</li>
            <li>Khám phá nền tảng kiến thức đằng sau hậu quả đó.</li>
          </ol>
        </div>

        <div className="nha-intro-actions">
          <PrimaryAction label="Bắt đầu xây nhà" onClick={handleBegin} />
        </div>
      </div>
    </AppShell>
  );
}
