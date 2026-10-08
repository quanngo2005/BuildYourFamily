# NHÀ — PRODUCT CONTEXT / CONTENT SPECIFICATION

> **Một gia đình được xây bằng những lựa chọn.**

## 0. DOCUMENT PURPOSE

Tài liệu này là **nguồn context tổng hợp duy nhất** cho sản phẩm web interactive learning game **NHÀ**.

Tài liệu được tạo từ ba lớp nội dung:

1. **Academic Source of Truth** — kiến thức học thuật từ giáo trình Chương 7, Mục I và II.
2. **Creative / Experience Specification** — concept, metaphor, storyline, interaction, visual direction và cách chuyển kiến thức thành trải nghiệm.
3. **Gameplay Specification** — scenario, choice, consequence, feedback, Family Score, progression, unlock, house construction, final profile và replay.

Tài liệu này dùng làm context cho:

- Content / Creative Agent (Grok)
- UI/UX / Design Agent
- Coding Agent
- QA Agent
- Thành viên trong nhóm phát triển sản phẩm

### Nguyên tắc tối cao

> **Academic layer không được tự ý thay đổi bởi creative layer, gameplay layer hoặc implementation layer.**

Creative content được phép sáng tạo cách kể chuyện, tình huống, lời thoại và interaction; nhưng mọi kết luận học thuật phải truy xuất được về một hoặc nhiều `CK_FAM_xx` đã được chuẩn hóa.

---

# 1. PRODUCT OVERVIEW

## 1.1. Tên sản phẩm

**NHÀ**

## 1.2. Tagline

**“Một gia đình được xây bằng những lựa chọn.”**

## 1.3. Chủ đề học tập

Môn **Chủ nghĩa xã hội khoa học**.

Chương 7:

> **Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội**

Phạm vi nội dung bắt buộc của sản phẩm:

- **Mục I — Khái niệm, vị trí và chức năng của gia đình**
- **Mục II — Cơ sở xây dựng gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội**

## 1.4. Định dạng sản phẩm

Web interactive learning game.

Sản phẩm không được định vị như một website đọc bài giảng hoặc quiz truyền thống.

Người chơi học thông qua:

> **tình huống → lựa chọn → hậu quả → thay đổi ngôi nhà → feedback → liên hệ kiến thức**

## 1.5. Concept cốt lõi

Người chơi nhận một mảnh đất và xây một ngôi nhà.

Ngôi nhà là metaphor cho **một gia đình**.

Mỗi lựa chọn là một quyết định ảnh hưởng tới:

- cấu trúc ngôi nhà;
- không gian sống;
- mức độ ổn định của nhà;
- trạng thái các game mechanic;
- phản hồi của các thành viên gia đình.

Người chơi không học bằng cách ghi nhớ đáp án, mà bằng cách **nhìn thấy kiến thức được phản ánh qua những lựa chọn đời sống**.

---

# 2. CONTENT GOVERNANCE

## 2.1. Ba lớp nội dung

### Layer A — Academic

Là nội dung bắt buộc, có nguồn từ giáo trình/tài liệu học thuật.

Bao gồm:

- định nghĩa;
- khái niệm;
- phân loại;
- chức năng;
- vị trí;
- cơ sở xây dựng gia đình;
- nguyên tắc / đặc trưng của chế độ hôn nhân tiến bộ;
- thuật ngữ học thuật;
- các quan hệ nhân quả được giáo trình nêu.

### Layer B — Creative

Có thể sáng tạo:

- concept;
- storytelling;
- scenario;
- character/context;
- câu hỏi tình huống;
- lựa chọn;
- lời thoại;
- consequence;
- feedback narrative;
- metaphor hình ảnh;
- game loop;
- score mechanic;
- progression;
- final profile;
- microcopy;
- visual metaphor;
- animation concept.

Creative layer **không được tạo ra luận điểm học thuật mới**.

### Layer C — Product / Implementation

Bao gồm:

- UI;
- layout;
- components;
- transitions;
- animation;
- responsive behavior;
- state management;
- data model;
- technical implementation.

Product layer phải phục vụ Creative + Academic layer, không thay đổi nội dung của hai layer này.

---

# 3. ACADEMIC SOURCE OF TRUTH

> Phần này là **nguồn sự thật học thuật**. Không tự ý chỉnh sửa thuật ngữ hoặc thêm luận điểm.

## A. KHÁI NIỆM GIA ĐÌNH

**Nguồn: Chương 7, Mục I.1**

### Định nghĩa

> Gia đình là một hình thức cộng đồng xã hội đặc biệt, được hình thành, duy trì và củng cố chủ yếu dựa trên cơ sở quan hệ hôn nhân, quan hệ huyết thống và quan hệ nuôi dưỡng, cùng với những quy định về quyền và nghĩa vụ của các thành viên trong gia đình.

### Các yếu tố cấu thành

- **Quan hệ hôn nhân (vợ – chồng):** Là cơ sở, nền tảng ban đầu hình thành nên gia đình và là căn cứ pháp lý cho sự tồn tại hợp pháp của mỗi gia đình.
- **Quan hệ huyết thống (cha mẹ – con cái, ông bà – cháu chắt, anh chị em...):** Là mối quan hệ tự nhiên giữa những người cùng chung dòng máu, nảy sinh từ quan hệ hôn nhân, đóng vai trò gắn kết bền chặt nhất giữa các thành viên.
- **Quan hệ nuôi dưỡng:** Xuất phát từ trách nhiệm, nghĩa vụ chăm sóc, bảo bọc lẫn nhau giữa các thế hệ (kể cả quan hệ cha mẹ nuôi – con nuôi được pháp luật thừa nhận), thể hiện đạo lý và trách nhiệm xã hội.

### Quyền và nghĩa vụ

Các mối quan hệ trong gia đình gắn liền với những quy định chặt chẽ về quyền và nghĩa vụ pháp lý, đạo đức giữa các thành viên trong gia đình.

### Các luận điểm quan trọng

- Gia đình là một **cộng đồng xã hội đặc biệt** (khác biệt với các cộng đồng xã hội khác ở tính gắn kết tình cảm, huyết thống và trách nhiệm đạo lý kết hợp pháp lý).
- Quan hệ hôn nhân là tiền đề xuất phát; quan hệ huyết thống là kết quả tự nhiên nảy sinh từ hôn nhân và giữ tính bền chặt cao nhất.

---

## B. VỊ TRÍ CỦA GIA ĐÌNH TRONG XÃ HỘI

**Nguồn: Chương 7, Mục I.2**

### Luận điểm 1 — Gia đình là tế bào của xã hội

Gia đình có vai trò quyết định đối với sự tồn tại, vận động và phát triển của toàn xã hội.

Chủ tịch Hồ Chí Minh đã khẳng định:

> “Hạt nhân của xã hội chính là gia đình”

Và luận điểm được nhấn mạnh:

> “Gia đình tốt thì xã hội mới tốt.”

### Luận điểm 2 — Gia đình là tổ ấm mang lại hạnh phúc cho mỗi cá nhân

Gia đình là môi trường an toàn và lành mạnh nhất về thể chất, tâm lý và tình cảm để mỗi cá nhân được yêu thương, chăm sóc, nuôi dưỡng, trưởng thành và phát triển toàn diện.

### Luận điểm 3 — Gia đình là cầu nối giữa cá nhân và xã hội

Gia đình là cộng đồng xã hội đầu tiên thực hiện chức năng xã hội hóa cá nhân, giúp mỗi người học hỏi và tiếp nhận các chuẩn mực xã hội.

Đồng thời, xã hội tác động đến con người thông qua lăng kính gia đình; các chủ trương, đường lối, chính sách và luồng thông tin xã hội đều được sàng lọc, tiếp nhận qua môi trường gia đình.

---

## C. CHỨC NĂNG CỦA GIA ĐÌNH

**Nguồn: Chương 7, Mục I.3**

| Chức năng | Nội dung / ý nghĩa | Thuật ngữ giáo trình |
|---|---|---|
| **Tái sản xuất ra con người** | Đáp ứng nhu cầu tâm – sinh lý tự nhiên của con người, duy trì nòi giống của dòng họ và cung cấp nguồn lao động mới cho xã hội. | Chức năng tái sản xuất ra con người; **chức năng đặc thù**. Đây là chức năng đặc thù duy nhất chỉ có ở gia đình; bảo đảm sự trường tồn, duy trì và phát triển liên tục của xã hội loài người. |
| **Nuôi dưỡng, giáo dục** | Thể hiện tình cảm thiêng liêng và trách nhiệm của cha mẹ đối với con cái; kết hợp chặt chẽ, hài hòa giữa giáo dục gia đình, nhà trường và xã hội. | Định hình nhân cách, đạo đức, lối sống ban đầu của thế hệ trẻ; chuẩn bị nguồn nhân lực phát triển toàn diện cho xã hội. |
| **Kinh tế và tổ chức đời sống gia đình (tổ chức tiêu dùng)** | Gia đình vừa là đơn vị tham gia sản xuất, cung ứng sức lao động cho thị trường, vừa là một đơn vị tiêu dùng quan trọng của xã hội; đảm nhiệm phân công lao động nội bộ và quản lý ngân sách thu – chi. | Đơn vị kinh tế; tổ chức tiêu dùng; phân công lao động nội bộ. |
| **Thỏa mãn nhu cầu tâm – sinh lý, duy trì tình cảm** | Đảm bảo sự cân bằng tinh thần, chia sẻ tình cảm, là chỗ dựa tâm lý an toàn nhất cho mỗi người; chăm sóc đời sống tinh thần giữa các thành viên. | Thỏa mãn nhu cầu tâm – sinh lý; duy trì tình cảm; chỗ dựa tâm lý an toàn. |

---

## D. CƠ SỞ KINH TẾ – XÃ HỘI

**Nguồn: Chương 7, Mục II.1**

### Khái niệm

Là tiền đề vật chất và điều kiện quan hệ sản xuất bảo đảm cho việc xây dựng thiết chế gia đình kiểu mới xã hội chủ nghĩa.

### Luận điểm

- Dựa trên sự phát triển của lực lượng sản xuất và việc từng bước thiết lập chế độ công hữu đối với các tư liệu sản xuất chủ yếu.
- Chế độ sở hữu xã hội giúp thủ tiêu nguồn gốc kinh tế của tình trạng bóc lột và sự lệ thuộc kinh tế của phụ nữ vào nam giới.
- Tạo điều kiện cho phụ nữ tham gia bình đẳng vào lao động xã hội, tự chủ về kinh tế và có tiếng nói bình đẳng trong gia đình cũng như ngoài xã hội.

### Quan hệ nhân quả được giáo trình nêu

- **Nguyên nhân:** Xóa bỏ chế độ tư hữu, xác lập chế độ công hữu về tư liệu sản xuất.
- **Kết quả:** Hôn nhân không còn bị chi phối bởi các toan tính tài sản, vụ lợi kinh tế hay địa vị xã hội; tình yêu chân chính trở thành nền tảng cốt lõi của hôn nhân.

### Ý nghĩa

Giải phóng người phụ nữ về mặt kinh tế, xây dựng sự bình đẳng thực chất giữa vợ và chồng trong tổ chức đời sống gia đình.

---

## E. CƠ SỞ CHÍNH TRỊ – XÃ HỘI

**Nguồn: Chương 7, Mục II.2**

### Khái niệm

Là hệ thống quyền lực chính trị và hành lang pháp lý do giai cấp công nhân và nhân dân lao động thiết lập nhằm bảo vệ và định hướng phát triển gia đình tiến bộ.

### Luận điểm

- Thiết lập Nhà nước xã hội chủ nghĩa – công cụ quyền lực của giai cấp công nhân và nhân dân lao động để giải phóng con người.
- Nhà nước ban hành và hoàn thiện hệ thống luật pháp cùng chính sách xã hội (Luật Hôn nhân và Gia đình, Luật Bình đẳng giới, Luật Phòng, chống bạo lực gia đình...).

### Quan hệ nhân quả được giáo trình nêu

- **Nguyên nhân:** Nhà nước XHCN thiết lập và hoàn thiện hệ thống pháp luật cùng chính sách xã hội.
- **Kết quả:** Quyền lợi hợp pháp, chính đáng của mọi thành viên trong gia đình được bảo vệ chặt chẽ, đặc biệt là quyền lợi của phụ nữ và trẻ em.

### Ý nghĩa

Tạo khuôn khổ pháp lý, ngăn ngừa sự tùy tiện, bất bình đẳng, bạo lực gia đình và củng cố thiết chế gia đình văn minh.

---

## F. CƠ SỞ VĂN HÓA

**Nguồn: Chương 7, Mục II.2**

### Khái niệm

Là nền tảng tư tưởng, tinh thần và các chuẩn mực đạo đức mới định hướng xây dựng lối sống gia đình tiến bộ.

### Luận điểm

- Nền tảng tư tưởng chính trị của giai cấp công nhân giữ vai trò chi phối và định hướng đời sống văn hóa, tinh thần.
- Nâng cao dân trí, phát triển giáo dục và khoa học trong toàn xã hội.
- Bài trừ các hủ tục, phong tục lạc hậu, tư tưởng gia trưởng, độc đoán và thói “trọng nam khinh nữ” của xã hội cũ; xây dựng hệ giá trị văn hóa gia đình tiến bộ, văn minh.

### Quan hệ nhân quả được giáo trình nêu

- **Nguyên nhân:** Nâng cao dân trí, phổ biến hệ tư tưởng công nhân và giáo dục đạo đức tiến bộ.
- **Kết quả:** Xóa bỏ các tàn dư tư tưởng gia trưởng, phong kiến; hình thành các giá trị văn hóa gia đình bình đẳng, dân chủ.

### Ý nghĩa

Giải phóng tư tưởng con người, tạo môi trường đạo đức lành mạnh để các thành viên tôn trọng, yêu thương và đối xử bình đẳng với nhau.

---

## G. CHẾ ĐỘ HÔN NHÂN TIẾN BỘ

**Nguồn: Chương 7, Mục II.3**

### Khái niệm

Không tìm thấy trong tài liệu một định nghĩa khái niệm riêng biệt bằng câu chữ định danh. Tài liệu xác định chế độ hôn nhân tiến bộ thông qua 3 nguyên tắc/đặc trưng cốt lõi dưới đây.

### 1. Hôn nhân tự nguyện

- Hôn nhân phải xuất phát từ tình yêu chân chính giữa nam và nữ, bảo đảm quyền tự do lựa chọn kết hôn mà không bị cưỡng ép hay chịu sự áp đặt từ gia đình, định kiến.
- Hôn nhân tự nguyện bao hàm cả quyền tự do ly hôn chính đáng khi tình yêu thực sự tan vỡ, đời sống chung không thể kéo dài; giáo trình không đồng tình hay cổ xúy việc ly hôn tùy tiện, thiếu trách nhiệm.

### 2. Hôn nhân một vợ một chồng, vợ chồng bình đẳng

- Là điều kiện tiên quyết đảm bảo hạnh phúc gia đình và phù hợp với quy luật tâm – sinh lý tự nhiên, đạo đức xã hội.
- Xóa bỏ đặc quyền gia trưởng của người đàn ông, bảo đảm vợ và chồng có quyền lợi, nghĩa vụ ngang nhau về mọi mặt trong tổ chức đời sống gia đình.
- Bình đẳng vợ chồng là nền tảng cho sự bình đẳng giữa cha mẹ với con cái và giữa các anh chị em.

### 3. Hôn nhân được bảo đảm về mặt pháp lý

- Việc kết hôn phải được đăng ký và thừa nhận bởi cơ quan nhà nước có thẩm quyền theo quy định của pháp luật.
- Thể hiện trách nhiệm của cá nhân đối với người bạn đời, gia đình và xã hội.
- Ngăn ngừa hành vi tùy tiện, bảo đảm cơ sở pháp lý vững chắc để bảo vệ quyền lợi chính đáng của phụ nữ và con trẻ khi phát sinh mâu thuẫn hay rủi ro.

### Ý nghĩa

Đảm bảo tự do, bình đẳng giới thực chất trong đời sống gia đình, củng cố tính bền vững và sự lành mạnh của tế bào xã hội.

---

# 4. CORE KNOWLEDGE — ACADEMIC SOURCE OF TRUTH IDS

```yaml
- ID: CK_FAM_01
  Tên: Định nghĩa gia đình
  Nội dung: Gia đình là một hình thức cộng đồng xã hội đặc biệt, được hình thành, duy trì và củng cố chủ yếu dựa trên cơ sở quan hệ hôn nhân, quan hệ huyết thống và quan hệ nuôi dưỡng, cùng với những quy định về quyền và nghĩa vụ của các thành viên.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.1
  Thuật ngữ cần giữ nguyên: Cộng đồng xã hội đặc biệt, quan hệ hôn nhân, quan hệ huyết thống, quan hệ nuôi dưỡng, quyền và nghĩa vụ

- ID: CK_FAM_02
  Tên: Quan hệ hôn nhân
  Nội dung: Là cơ sở, nền tảng ban đầu hình thành nên gia đình và là căn cứ pháp lý cho sự tồn tại hợp pháp của mỗi gia đình.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.1
  Thuật ngữ cần giữ nguyên: Quan hệ hôn nhân, căn cứ pháp lý, nền tảng ban đầu

- ID: CK_FAM_03
  Tên: Quan hệ huyết thống
  Nội dung: Là mối quan hệ tự nhiên giữa những người cùng chung dòng máu, nảy sinh từ quan hệ hôn nhân, đóng vai trò gắn kết bền chặt nhất giữa các thành viên trong gia đình.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.1
  Thuật ngữ cần giữ nguyên: Quan hệ huyết thống, gắn kết bền chặt nhất

- ID: CK_FAM_04
  Tên: Quan hệ nuôi dưỡng
  Nội dung: Xuất phát từ trách nhiệm, nghĩa vụ chăm sóc, bảo bọc lẫn nhau giữa các thế hệ (bao gồm cha mẹ nuôi – con nuôi hợp pháp), thể hiện đạo lý và trách nhiệm xã hội.
  Mức độ quan trọng: SHOULD
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.1
  Thuật ngữ cần giữ nguyên: Quan hệ nuôi dưỡng, trách nhiệm xã hội, đạo lý

- ID: CK_FAM_05
  Tên: Gia đình là tế bào của xã hội
  Nội dung: Gia đình có vai trò quyết định đối với sự tồn tại, vận động và phát triển của toàn xã hội; là hạt nhân xã hội như Hồ Chí Minh khẳng định: "Gia đình tốt thì xã hội mới tốt".
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.2
  Thuật ngữ cần giữ nguyên: Tế bào của xã hội, hạt nhân của xã hội

- ID: CK_FAM_06
  Tên: Gia đình là tổ ấm mang lại hạnh phúc cho cá nhân
  Nội dung: Gia đình là môi trường an toàn và lành mạnh nhất về thể chất, tâm lý, tình cảm để mỗi cá nhân được che chở, nuôi dưỡng, trưởng thành và phát triển toàn diện.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.2
  Thuật ngữ cần giữ nguyên: Tổ ấm mang lại hạnh phúc, phát triển toàn diện

- ID: CK_FAM_07
  Tên: Gia đình là cầu nối giữa cá nhân và xã hội
  Nội dung: Là cộng đồng đầu tiên thực hiện xã hội hóa cá nhân và là lăng kính tiếp nhận, sàng lọc các chủ trương, chính sách, tác động từ xã hội tới từng cá nhân.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.2
  Thuật ngữ cần giữ nguyên: Cầu nối giữa cá nhân và xã hội, xã hội hóa cá nhân, lăng kính gia đình

- ID: CK_FAM_08
  Tên: Chức năng tái sản xuất ra con người
  Nội dung: Là chức năng đặc thù duy nhất chỉ có ở gia đình; nhằm đáp ứng nhu cầu tâm – sinh lý tự nhiên, duy trì nòi giống dòng họ và cung cấp nguồn lao động mới cho xã hội.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.3
  Thuật ngữ cần giữ nguyên: Tái sản xuất ra con người, chức năng đặc thù

- ID: CK_FAM_09
  Tên: Chức năng nuôi dưỡng, giáo dục
  Nội dung: Thể hiện tình cảm thiêng liêng, trách nhiệm của cha mẹ đối với con cái; định hình nhân cách, đạo đức, lối sống ban đầu qua sự phối hợp giữa gia đình, nhà trường và xã hội.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.3
  Thuật ngữ cần giữ nguyên: Nuôi dưỡng, giáo dục, định hình nhân cách ban đầu

- ID: CK_FAM_10
  Tên: Chức năng kinh tế và tổ chức tiêu dùng
  Nội dung: Gia đình vừa là đơn vị tham gia sản xuất, cung ứng sức lao động, vừa là đơn vị tiêu dùng quan trọng; chịu trách nhiệm phân công lao động nội bộ và quản lý ngân sách gia đình.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.3
  Thuật ngữ cần giữ nguyên: Đơn vị kinh tế, tổ chức tiêu dùng, phân công lao động nội bộ

- ID: CK_FAM_11
  Tên: Chức năng thỏa mãn nhu cầu tâm - sinh lý, tình cảm
  Nội dung: Duy trì cân bằng tinh thần, chia sẻ tình cảm, là chỗ dựa tâm lý an toàn nhất cho cá nhân; giúp hóa giải áp lực xã hội và ngăn ngừa tệ nạn xã hội xâm nhập.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục I.3
  Thuật ngữ cần giữ nguyên: Nhu cầu tâm – sinh lý, duy trì tình cảm, chỗ dựa tâm lý an toàn

- ID: CK_FAM_12
  Tên: Cơ sở kinh tế – xã hội xây dựng gia đình mới
  Nội dung: Phát triển lực lượng sản xuất và thiết lập chế độ công hữu tư liệu sản xuất chủ yếu, xóa bỏ cội nguồn áp bức kinh tế và sự lệ thuộc của phụ nữ vào nam giới.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.1
  Thuật ngữ cần giữ nguyên: Cơ sở kinh tế – xã hội, chế độ công hữu tư liệu sản xuất, xóa bỏ nguồn gốc kinh tế của sự áp bức

- ID: CK_FAM_13
  Tên: Nền tảng kinh tế của tình yêu chân chính
  Nội dung: Việc xóa bỏ chế độ tư hữu tư liệu sản xuất giúp giải phóng hôn nhân khỏi các tính toán vụ lợi về tài sản, địa vị xã hội, đưa tình yêu trở thành cơ sở đích thực của hôn nhân.
  Mức độ quan trọng: SHOULD
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.1
  Thuật ngữ cần giữ nguyên: Chế độ tư hữu, tình yêu chân chính, phi vụ lợi

- ID: CK_FAM_14
  Tên: Cơ sở chính trị – xã hội xây dựng gia đình mới
  Nội dung: Thiết lập Nhà nước XHCN nhằm giải phóng con người; ban hành và thực thi hệ thống pháp luật (Luật Hôn nhân và Gia đình, Bình đẳng giới...) để bảo vệ các thành viên, nhất là phụ nữ và trẻ em.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.2
  Thuật ngữ cần giữ nguyên: Cơ sở chính trị – xã hội, Nhà nước xã hội chủ nghĩa, bảo vệ quyền lợi phụ nữ và trẻ em

- ID: CK_FAM_15
  Tên: Cơ sở văn hóa xây dựng gia đình mới
  Nội dung: Định hướng đời sống tinh thần theo hệ tư tưởng giai cấp công nhân; nâng cao dân trí; xóa bỏ hủ tục, thói gia trưởng, phong kiến "trọng nam khinh nữ"; xây dựng hệ giá trị văn hóa tiến bộ.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.2
  Thuật ngữ cần giữ nguyên: Cơ sở văn hóa, tư tưởng giai cấp công nhân, bài trừ tư tưởng gia trưởng, trọng nam khinh nữ

- ID: CK_FAM_16
  Tên: Nguyên tắc Hôn nhân tự nguyện
  Nội dung: Hôn nhân xuất phát từ tình yêu nam nữ chân chính, tự do kết hôn không ép buộc; bao hàm quyền tự do ly hôn chính đáng khi tình cảm thực sự tan vỡ (không chấp nhận ly hôn tùy tiện).
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.3
  Thuật ngữ cần giữ nguyên: Hôn nhân tự nguyện, tự do ly hôn chính đáng, tình yêu chân chính

- ID: CK_FAM_17
  Tên: Nguyên tắc Một vợ một chồng, vợ chồng bình đẳng
  Nội dung: Điều kiện tiên quyết bảo đảm hạnh phúc gia đình; xóa bỏ đặc quyền gia trưởng của nam giới; bảo đảm vợ và chồng có quyền và nghĩa vụ ngang nhau về mọi mặt.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.3
  Thuật ngữ cần giữ nguyên: Hôn nhân một vợ một chồng, vợ chồng bình đẳng, xóa bỏ đặc quyền gia trưởng

- ID: CK_FAM_18
  Tên: Nguyên tắc Hôn nhân được bảo đảm về mặt pháp lý
  Nội dung: Kết hôn phải đăng ký tại cơ quan nhà nước có thẩm quyền; thể hiện trách nhiệm công dân và tạo căn cứ pháp lý bảo vệ quyền lợi phụ nữ và trẻ nhỏ trước rủi ro, tranh chấp.
  Mức độ quan trọng: MUST
  Nguồn: Giáo trình CNXHKH
  Trang/mục: Chương 7, Mục II.3
  Thuật ngữ cần giữ nguyên: Bảo đảm về mặt pháp lý, đăng ký kết hôn, cơ quan nhà nước có thẩm quyền
```

---

# 5. CREATIVE MASTER CONCEPT

## 5.1. Central Metaphor

> **Gia đình = Ngôi nhà**

Ngôi nhà được xây và thay đổi theo từng quyết định của người chơi.

Mapping tổng:

| Academic Knowledge | Creative Representation |
|---|---|
| CK_FAM_01–04 | Khung nhà / các quan hệ cấu thành |
| CK_FAM_05–07 | Vị trí ngôi nhà trong khu phố / xã hội |
| CK_FAM_08–11 | Bốn không gian / chức năng sống |
| CK_FAM_12–15 | Nền móng |
| CK_FAM_16–18 | Cửa chính + luật sống trong nhà |

## 5.2. Product Story

Người chơi nhận được một mảnh đất trống ở một khu phố đang chuyển mình, là ẩn dụ cho **thời kỳ quá độ**.

Họ được giao nhiệm vụ:

> **Xây một ngôi nhà cho một gia đình mới.**

Ban đầu chỉ có đất trống và một bản thiết kế sơ khai.

Qua từng chương, người chơi:

1. Đặt nền móng quan hệ.
2. Xây khung và kết cấu.
3. Thiết kế các không gian sống.
4. Xây ba lớp nền kinh tế – chính trị – văn hóa.
5. Thiết kế cửa chính và luật sống theo chế độ hôn nhân tiến bộ.
6. Nhìn lại ngôi nhà sau toàn bộ lựa chọn.

Mỗi lựa chọn sai có thể để lại:

- vết nứt;
- tường lệch;
- căn phòng không sử dụng được;
- nền móng lún;
- cửa bị khóa một chiều;
- phòng tối;
- các dấu hiệu mất cân bằng khác.

---

# 6. GROK CREATIVE TASKS

Phần này là **creative brief chi tiết cho Grok**. Grok được phép sáng tạo ở mức trải nghiệm nhưng phải tuyệt đối tuân thủ Academic Source of Truth.

## TASK X0 — CREATIVE GOVERNANCE

### Mục tiêu

Thiết lập quy tắc trước khi sáng tạo.

### Grok phải tuân thủ

1. `CK_FAM_01 → CK_FAM_18` là Academic Source of Truth.
2. Không tạo thêm knowledge item học thuật ngoài danh sách này.
3. Không đổi nghĩa các knowledge item.
4. Không thay thế thuật ngữ giáo trình bằng hệ thống khái niệm mới.
5. Scenario có thể hư cấu nhưng academic takeaway phải map về một hoặc nhiều CK ID.
6. Feedback phải phân biệt rõ creative consequence và academic explanation.
7. Family Score chỉ là **game mechanic**.
8. Không gọi Family Score là chỉ số khoa học, chỉ số hạnh phúc thực tế, công cụ đánh giá sinh viên hoặc tiêu chuẩn đạo đức.
9. Không đánh giá người chơi bằng tính từ đạo đức như “ích kỷ”, “xấu”, “tốt”.
10. Không biến game thành quiz truyền thống.

### Output

Grok phải xác nhận đã hiểu và duy trì hai lớp:

```text
ACADEMIC TRUTH
        ↓
CREATIVE INTERPRETATION
```

Không đảo ngược quan hệ này.

---

## TASK X1 — CREATIVE DIRECTION / EXPERIENCE DESIGN

### Mục tiêu

Xây dựng cách kể chuyện và trải nghiệm cho sản phẩm NHÀ dựa trên Academic Source of Truth.

### Định hướng bắt buộc

Sản phẩm phải có cảm giác như:

> một interactive experience / house-building experience

chứ không phải:

> một bài kiểm tra kiến thức.

### Experience Principles

- Người chơi **xây** thay vì **trả lời**.
- Không hỏi “Đáp án đúng là gì?”.
- Dùng câu hỏi kiểu:
  > “Bạn muốn xây như thế nào?”
- Lựa chọn phải tạo hậu quả trực quan.
- Feedback đến từ người sống trong nhà hoặc một narrator phù hợp.
- Academic explanation xuất hiện như một lớp giải thích sau trải nghiệm.
- Người chơi có thể tò mò chơi lại để xem ngôi nhà khác đi như thế nào.

### Metaphor mapping phải được bảo toàn

- Quan hệ hôn nhân → viên đá / điểm móng đầu tiên.
- Quan hệ huyết thống → cột trụ.
- Quan hệ nuôi dưỡng → cầu thang / kết nối các tầng.
- Quyền và nghĩa vụ → hệ thống điện / nước chạy trong nhà.
- Tế bào xã hội → vị trí nhà trong khu phố.
- Tổ ấm → ánh sáng và nhiệt độ không gian.
- Cầu nối cá nhân – xã hội → cửa sổ, cổng, lối kết nối với đường phố.
- Bốn chức năng → bốn không gian sống.
- Ba cơ sở → ba lớp nền móng.
- Ba nguyên tắc hôn nhân → cửa chính + nội quy.

### Tách Mục I / Mục II

**Mục I:** phần nhìn thấy được.

> “Gia đình là gì / đứng ở đâu / làm gì?”

**Mục II:** phần nền móng và luật sống.

> “Gia đình được xây trên nền nào / theo nguyên tắc nào?”

### Output X1

Grok phải trả về:

1. Experience concept.
2. Storytelling structure.
3. User journey.
4. Interaction principles.
5. Visual metaphor mapping.
6. Feedback philosophy.
7. Cách giữ ranh giới Academic vs Creative.

---

## TASK X2 — SCENARIO DESIGN

### Mục tiêu

Tạo các tình huống đời sống gần gũi với sinh viên / người trẻ Việt Nam để kích hoạt kiến thức Chương 7.

### Nguyên tắc

Mỗi scenario phải:

- có conflict rõ ràng;
- buộc người chơi đưa ra lựa chọn;
- có 2–4 lựa chọn;
- mỗi lựa chọn tạo consequence;
- consequence tác động tới ngôi nhà;
- có feedback nhân vật;
- map về knowledge ID;
- không thêm luận điểm học thuật mới.

### Format bắt buộc

```text
Scenario ID
Title
Context
Question
Choice A
  Consequence
  Feedback
  Score impact
  Related knowledge IDs
Choice B
  Consequence
  Feedback
  Score impact
  Related knowledge IDs
Choice C
  Consequence
  Feedback
  Score impact
  Related knowledge IDs
```

### Scenario được duyệt hiện tại

#### S01 — Ai làm việc nhà?

**Context:** Minh và Lan vừa tốt nghiệp, sống chung trong căn hộ nhỏ. Cả hai đều đi làm. Tối nay Lan về muộn vì họp, Minh đang ngồi xem điện thoại trong khi chén bát và quần áo chưa giặt. Lan đứng ở cửa nhìn cảnh tượng đó.

**Question:**

> Bạn sẽ quyết định như thế nào để tổ chức đời sống gia đình hôm nay?

**Choice A:**

> “Em về muộn thì em làm đi, anh mệt rồi.”

- Consequence: Tường phòng khách xuất hiện vết nứt nhỏ, một bên nghiêng.
- Feedback: Lan ngồi im lặng, ánh sáng trong nhà dịu đi. “Anh nghĩ việc nhà là trách nhiệm của một mình em à?”
- Score: -2
- Related knowledge: `CK_FAM_17`

**Choice B:**

> “Anh làm chén bát và giặt đồ, em nghỉ đi. Mai mình phân công lại cho công bằng.”

- Consequence: Tường được gia cố, ánh sáng ấm lên, không gian cân bằng.
- Feedback: Lan mỉm cười: “Cảm ơn anh. Như vậy mình mới thật sự là đối tác.”
- Score: +3
- Related knowledge: `CK_FAM_17`

**Choice C:**

> “Mình thuê người giúp việc mỗi tuần một buổi, còn lại chia đều công việc.”

- Consequence: Không gian được tổ chức lại gọn gàng, thêm một góc tiện nghi.
- Feedback: Cả hai đều cảm thấy nhẹ nhàng hơn. “Giải pháp này giúp mình giữ được sự công bằng lâu dài.”
- Score: +2
- Related knowledge: `CK_FAM_17`, `CK_FAM_10`

---

#### S02 — Ai là trụ cột?

**Context:** Tuấn vừa mất việc. Vợ anh – Hương – đang mang thai tháng thứ 5 và vẫn đi làm. Bố mẹ Tuấn gọi điện khuyên: “Con nên để Hương nghỉ việc ở nhà, con cố gắng tìm việc mới, đàn ông phải là trụ cột.”

**Question:**

> Bạn sẽ chọn cách ứng xử nào?

**Choice A:**

> “Em nghỉ việc đi, anh sẽ lo kinh tế.”

- Consequence: Nền móng kinh tế bị lún một bên, căn nhà nghiêng về phía phụ thuộc.
- Feedback: Hương nói khẽ: “Em cảm thấy mình đang phụ thuộc về kinh tế.”
- Score: -3
- Related knowledge: `CK_FAM_12`, `CK_FAM_13`

**Choice B:**

> “Em vẫn đi làm nếu muốn. Mình cùng tìm giải pháp, không ai phải phụ thuộc ai.”

- Consequence: Nền móng được đổ đều, vững chắc hơn.
- Feedback: Hương nắm tay Tuấn: “Cảm ơn anh vì không để kinh tế quyết định vị thế của mình.”
- Score: +3
- Related knowledge: `CK_FAM_12`, `CK_FAM_13`

**Choice C:**

> “Mình tạm thời để em giảm giờ làm, anh nhận thêm công việc thời vụ, nhưng quyết định cuối cùng là của em.”

- Consequence: Nền móng ổn định, có thêm một lớp gia cố linh hoạt.
- Feedback: Cả hai cùng thở phào. “Mình vẫn giữ được sự tự chủ.”
- Score: +2
- Related knowledge: `CK_FAM_12`, `CK_FAM_13`

---

#### S03 — Ai dạy con?

**Context:** Bé An 5 tuổi nghịch phá làm vỡ lọ hoa. Bà nội muốn đánh đòn “cho nhớ”. Bố mẹ An đang tranh luận.

**Question:**

> Bạn chọn cách giáo dục nào?

**Choice A:**

> Đồng ý để bà đánh đòn: “Trẻ con phải dạy nghiêm từ nhỏ.”

- Consequence: Phòng học/chơi của trẻ trở nên tối và chật hẹp.
- Feedback: An nép vào góc tường. Ánh sáng trong phòng dịu hẳn.
- Score: -2
- Related knowledge: `CK_FAM_09`

**Choice B:**

> Bố mẹ ngồi xuống nói chuyện với An, giải thích vì sao không được phá đồ, rồi cùng dọn dẹp.

- Consequence: Phòng học/chơi sáng lên, có thêm kệ sách và góc sáng tạo.
- Feedback: An gật đầu: “Con hiểu rồi ạ.”
- Score: +3
- Related knowledge: `CK_FAM_09`

**Choice C:**

> Bố mẹ để bà dạy theo cách cũ, còn mình chỉ lo việc học chữ cho con.

- Consequence: Phòng bị chia đôi, một nửa tối, một nửa sáng nhưng không kết nối.
- Feedback: An trở nên lúng túng, không biết nghe ai.
- Score: -1
- Related knowledge: `CK_FAM_09`

---

#### S04 — Con trai hay con gái?

**Context:** Gia đình Hùng vừa sinh con gái thứ hai. Ông nội thở dài: “Nhà mình lại không có cháu đích tôn.” Một số họ hàng khuyên “sinh thêm cho có con trai”.

**Question:**

> Bạn sẽ phản ứng thế nào?

**Choice A:**

> Đồng ý sinh thêm vì “phải có con trai nối dõi”.

- Consequence: Tường nhà xuất hiện hoa văn cũ kỹ, nặng nề, ánh sáng bị che khuất.
- Feedback: Vợ Hùng im lặng quay đi. Không khí trong nhà trở nên ngột ngạt.
- Score: -3
- Related knowledge: `CK_FAM_15`

**Choice B:**

> “Con gái hay con trai đều là con. Mình không chấp nhận tư tưởng trọng nam khinh nữ.”

- Consequence: Hoa văn cũ bị gỡ bỏ, tường được sơn lại sáng và cân bằng.
- Feedback: Vợ Hùng nắm tay chồng. “Cảm ơn anh.”
- Score: +3
- Related knowledge: `CK_FAM_15`

**Choice C:**

> Im lặng không phản đối, nhưng cũng không sinh thêm.

- Consequence: Hoa văn cũ vẫn còn, chỉ bị phủ một lớp sơn mỏng.
- Feedback: Không khí trong nhà vẫn còn nặng nề.
- Score: 0
- Related knowledge: `CK_FAM_15`

---

#### S05 — Khi có bạo lực

**Context:** Mai bị chồng lớn tiếng đe dọa và đập đồ khi say. Hàng xóm khuyên “chuyện trong nhà thì giữ trong nhà”. Mai đang phân vân có nên nhờ đến pháp luật hay không.

**Question:**

> Bạn khuyên Mai làm gì?

**Choice A:**

> “Cứ chịu đựng, chuyện vợ chồng không nên đưa ra ngoài.”

- Consequence: Cửa chính bị khóa từ bên trong, không ai mở được.
- Feedback: Mai ngồi trong góc tối. “Không ai bảo vệ được mình.”
- Score: -3
- Related knowledge: `CK_FAM_14`

**Choice B:**

> “Em nên tìm sự hỗ trợ từ cơ quan có thẩm quyền và các tổ chức bảo vệ phụ nữ. Đây là quyền hợp pháp của em.”

- Consequence: Cửa chính được mở rộng, có thêm hệ thống bảo vệ rõ ràng.
- Feedback: Mai thở phào: “Cuối cùng mình cũng được bảo vệ.”
- Score: +3
- Related knowledge: `CK_FAM_14`

**Choice C:**

> “Em chỉ nên bỏ về nhà ngoại, đừng làm lớn chuyện.”

- Consequence: Cửa sổ được mở nhưng cửa chính vẫn khóa.
- Feedback: Mai rời đi nhưng vẫn mang theo nỗi sợ.
- Score: -1
- Related knowledge: `CK_FAM_14`

---

#### S06 — Kết hôn vì yêu hay vì hoàn cảnh?

**Context:** Nam và Hà yêu nhau 3 năm. Gia đình Hà thúc giục cưới vì “đủ tuổi” và nhà trai có điều kiện. Nam cảm thấy chưa sẵn sàng về tài chính và cả hai chưa thật sự chắc chắn về tương lai.

**Question:**

> Bạn chọn hướng đi nào?

**Choice A:**

> Cưới vì áp lực gia đình và điều kiện kinh tế.

- Consequence: Cửa chính được dựng vội, lệch lạc, thiếu độ vững.
- Feedback: Hà nói khẽ: “Mình cưới vì áp lực chứ không phải vì mình đã sẵn sàng.”
- Score: -3
- Related knowledge: `CK_FAM_16`, `CK_FAM_13`

**Choice B:**

> Hai người quyết định chờ thêm, chỉ kết hôn khi cả hai thật sự sẵn sàng và tự nguyện.

- Consequence: Cửa chính được thiết kế chắc chắn, cân đối, có thể mở hai chiều.
- Feedback: Nam nắm tay Hà: “Mình sẽ bước vào khi cả hai đều muốn.”
- Score: +3
- Related knowledge: `CK_FAM_16`, `CK_FAM_17`, `CK_FAM_18`

**Choice C:**

> Cưới nhưng không đăng ký kết hôn, “sống thử thêm”.

- Consequence: Cửa chính chỉ là tấm rèm, không có khung pháp lý.
- Feedback: Khi có mâu thuẫn, không ai được bảo vệ rõ ràng.
- Score: -2
- Related knowledge: `CK_FAM_18`

---

#### S07 — Ngôi nhà hoàn thiện

**Context:** Sau nhiều quyết định, ngôi nhà đã gần xong. Người chơi được nhìn lại toàn bộ và đưa ra lựa chọn cuối cùng về “luật sống” trong nhà.

**Question:**

> Bạn muốn ngôi nhà này vận hành theo nguyên tắc nào?

**Choice A:**

> “Đàn ông quyết định lớn, phụ nữ lo việc nhà và con cái.”

- Consequence: Toàn bộ ngôi nhà nghiêng rõ rệt, nhiều vết nứt cũ tái hiện.
- Feedback: Các thành viên nữ im lặng. Ánh sáng yếu dần.
- Score: -5
- Related knowledge: `CK_FAM_17`, `CK_FAM_15`, `CK_FAM_12`

**Choice B:**

> “Mọi quyết định lớn đều được bàn bạc bình đẳng. Tình yêu, trách nhiệm và pháp luật là nền tảng.”

- Consequence: Ngôi nhà sáng lên, vững chắc, các không gian kết nối hài hòa.
- Feedback: Cả gia đình ngồi sum họp dưới ánh sáng ấm. “Đây mới thật sự là nhà của chúng ta.”
- Score: +5
- Related knowledge: `CK_FAM_16`, `CK_FAM_17`, `CK_FAM_18`, `CK_FAM_05`, `CK_FAM_07`

**Choice C:**

> “Ai mạnh thì quyết, miễn là kinh tế ổn.”

- Consequence: Nhà đẹp về vật chất nhưng lạnh lẽo, thiếu kết nối tình cảm.
- Feedback: Các thành viên sống trong cùng một mái nhà nhưng ít nói chuyện.
- Score: -2
- Related knowledge: `CK_FAM_13`, `CK_FAM_11`

---

# 7. FAMILY SCORE — GAME MECHANIC

## 7.1. Nguyên tắc

Family Score là **game mechanic thuần túy**.

Nó không phải:

- chỉ số khoa học;
- thước đo chất lượng gia đình thực tế;
- công cụ đánh giá đạo đức;
- công cụ đánh giá sinh viên;
- kết luận tâm lý/xã hội về người chơi.

Nó chỉ tồn tại để:

- tạo cảm giác tiến triển;
- phản ánh hậu quả lựa chọn trong game;
- điều khiển trạng thái trực quan của ngôi nhà;
- tạo sự khác biệt giữa các lượt chơi.

## 7.2. Bốn chỉ số

| Chỉ số | Tên hiển thị | Ý nghĩa trong game | Liên hệ kiến thức chính |
|---|---|---|---|
| **ECONOMY** | Kinh tế | Chỉ số thể hiện mức độ tự chủ kinh tế mà người chơi xây dựng được trong ngôi nhà (game mechanic) | CK_FAM_10, CK_FAM_12, CK_FAM_13 |
| **EDUCATION** | Giáo dục | Chỉ số thể hiện chất lượng không gian nuôi dưỡng & giáo dục trong ngôi nhà (game mechanic) | CK_FAM_09 |
| **EQUALITY** | Bình đẳng | Chỉ số thể hiện mức độ cân bằng quyền và trách nhiệm giữa các thành viên trong ngôi nhà (game mechanic) | CK_FAM_17, CK_FAM_15, CK_FAM_14 |
| **EMOTION** | Tình cảm | Chỉ số thể hiện mức độ an toàn tâm lý và gắn kết tình cảm bên trong ngôi nhà (game mechanic) | CK_FAM_11, CK_FAM_06 |

## 7.3. Score range

- Range: **0 → 100**.
- Initial state: **40 / 40 / 40 / 40**.

## 7.4. Score thresholds

- **Dưới 30:** ngôi nhà đang mất cân bằng.
- **Trên 70:** mở hiệu ứng tích cực.

Hiệu ứng tích cực có thể gồm:

- ánh sáng ấm;
- cây xanh mọc;
- tiếng cười;
- không gian sinh động.

## 7.5. Visual relation

### ECONOMY thấp

- nền móng lún;
- tường nứt phía kinh tế;
- nhà nghiêng về phía phụ thuộc.

### EDUCATION thấp

- phòng học/chơi tối;
- phòng chật;
- đồ chơi / một số vật dụng có thể bị khóa.

### EQUALITY thấp

- cửa chính lệch;
- tường nghiêng;
- một bên nhà cao hơn bên kia.

### EMOTION thấp

- ánh sáng lạnh;
- góc sofa trống;
- thiếu kết nối giữa thành viên.

---

# 8. SCORE / CHOICE DATA RULE

Mỗi lựa chọn có thể tác động 1–3 chỉ số Family Score.

**Lưu ý quan trọng:** Các scenario hiện tại đã xác định **tổng Score tăng/giảm** và knowledge mapping, nhưng không phải tất cả lựa chọn đều đã có **dimension-level score mapping** (`economy`, `education`, `equality`, `emotion`) trong source content hiện tại.

Coding / game-design agent **không được tự suy đoán** dimension-level mapping để biến thành “kiến thức học thuật”. Nếu cần implementation chi tiết, mapping từng choice sang 4 dimensions phải được xác định như một bước gameplay balancing riêng, nhưng phải giữ nguyên tổng score đã được cung cấp trong scenario specification.

---

# 9. HOUSE CONSTRUCTION SYSTEM

Ngôi nhà được xây real-time theo bốn chỉ số.

| Chỉ số | Thành phần ngôi nhà |
|---|---|
| ECONOMY | Nền móng; độ rộng bếp; khu vực làm việc |
| EDUCATION | Kích thước và độ sáng phòng học/chơi trẻ em |
| EQUALITY | Độ cân đối toàn bộ kết cấu; tường; cửa chính |
| EMOTION | Ánh sáng; màu tường; góc thư giãn; tiếng nói / tương tác của thành viên |

Người chơi luôn nhìn thấy ngôi nhà ở góc màn hình hoặc giữa màn hình.

Mỗi lựa chọn =

> **một viên gạch được đặt xuống hoặc một vết nứt xuất hiện.**

---

# 10. PROGRESSION

## 10.1. Main gameplay loop

```text
Gặp tình huống / câu hỏi
        ↓
Đưa ra lựa chọn
        ↓
Ngôi nhà thay đổi ngay lập tức
        ↓
Family Score thay đổi
        ↓
Feedback nhân vật / narrator
        ↓
Knowledge explanation
        ↓
Tiếp tục giai đoạn tiếp theo
```

## 10.2. Unlock system

| Giai đoạn | Điều kiện mở khóa | Nội dung được mở |
|---|---|---|
| Nền móng quan hệ | Hoàn thành S01 + S06 | Mở đầy đủ 3 quan hệ: hôn nhân – huyết thống – nuôi dưỡng |
| Bốn không gian sống | Hoàn thành S03 | Mở phòng Giáo dục + góc Tình cảm |
| Ba lớp nền móng | Hoàn thành S02 + S04 + S05 | Mở lớp Kinh tế – Chính trị – Văn hóa |
| Cửa chính & luật nhà | Hoàn thành S07 | Mở hình dạng cửa chính cuối cùng + nội quy gia đình |
| Ngôi nhà hoàn thiện | Tổng điểm trung bình ≥ 65 hoặc chơi hết 7 scenario | Mở Final Profile + khả năng chia sẻ |

---

# 11. FINAL PROFILE

Tên màn:

> **Hồ sơ ngôi nhà**

Phải bao gồm:

- hình ảnh ngôi nhà hoàn chỉnh;
- 4 chỉ số cuối cùng dưới dạng thanh ngang;
- trạng thái ngôi nhà;
- một đoạn mô tả ngắn;
- nhãn flavor text;
- khả năng chơi lại.

### Ví dụ mô tả

> “Ngôi nhà của bạn vững về kinh tế, sáng về giáo dục, cân bằng về bình đẳng và ấm về tình cảm. Các thành viên cảm thấy được tôn trọng và có chỗ dựa an toàn.”

### Flavor text

- **Ngôi nhà tiến bộ**
- **Ngôi nhà đang chuyển mình**
- **Ngôi nhà còn nhiều vết nứt cần gia cố**

Các nhãn trên chỉ là **flavor text**, không phải xếp hạng khoa học.

---

# 12. REPLAY VALUE

## New Game+

Chơi lại từ đầu với ngôi nhà trống; có thể cho phép người chơi khám phá những hậu quả khác của các lựa chọn.

## Challenge Mode

Bắt đầu với:

> **25 / 25 / 25 / 25**

Ẩn dụ:

> “xây nhà trong điều kiện khó”

## Family Variation

Cho phép lựa chọn biến thể gia đình ở đầu game, ví dụ:

- vợ chồng trẻ;
- gia đình đa thế hệ;
- mẹ đơn thân.

Scenario có thể thay đổi nhẹ theo variation nhưng **kiến thức giữ nguyên**.

## Share & Compare

Người chơi có thể chia sẻ:

- hình ảnh ngôi nhà;
- 4 game score;
- flavor text.

Mục tiêu là tạo sự so sánh về **cách chơi**, không so sánh “giá trị con người”.

## Hidden Paths

Một số tổ hợp lựa chọn có thể mở ra đoạn hội thoại / góc nhà đặc biệt.

Ví dụ:

> Chọn liên tục theo hướng bình đẳng cao → mở thêm “ban công nhìn ra khu phố”.

Đây là creative metaphor cho:

> **CK_FAM_07 — Gia đình là cầu nối giữa cá nhân và xã hội.**

---

# 13. USER JOURNEY / EXPERIENCE FLOW

## Stage 0 — Landing

Người chơi nhìn thấy:

- tên NHÀ;
- tagline;
- ngôi nhà / mảnh đất;
- CTA bắt đầu.

Mục tiêu: tạo tò mò, không giải thích quá nhiều lý thuyết ngay màn đầu.

## Stage 1 — Introduction

Giới thiệu premise:

> “Bạn có một mảnh đất. Hãy xây một ngôi nhà cho một gia đình mới.”

## Stage 2 — Gia đình là gì?

Khám phá:

- CK_FAM_01;
- CK_FAM_02;
- CK_FAM_03;
- CK_FAM_04.

Người chơi xây phần khung / quan hệ.

## Stage 3 — Gia đình đứng ở đâu?

Khám phá:

- CK_FAM_05;
- CK_FAM_06;
- CK_FAM_07.

Ngôi nhà được đặt trong context khu phố / xã hội.

## Stage 4 — Gia đình làm gì?

Khám phá:

- CK_FAM_08;
- CK_FAM_09;
- CK_FAM_10;
- CK_FAM_11.

Xây các không gian sống.

## Stage 5 — Xây trên nền gì?

Khám phá:

- CK_FAM_12;
- CK_FAM_14;
- CK_FAM_15.

Xây ba lớp nền móng.

## Stage 6 — Luật sống / Hôn nhân tiến bộ

Khám phá:

- CK_FAM_16;
- CK_FAM_17;
- CK_FAM_18.

Thiết kế cửa chính và luật nhà.

## Stage 7 — Final House

Ngôi nhà hoàn thiện.

Người chơi nhìn lại các thay đổi đã tạo ra.

## Stage 8 — Final Profile

Hiển thị hồ sơ ngôi nhà và replay options.

---

# 14. VISUAL DIRECTION

## 14.1. Overall aesthetic

**Minimalist đương đại + ấm áp.**

Không làm theo phong cách:

- giáo trình;
- museum / historical display;
- preschool playful;
- infographic học thuật khô cứng.

Cảm giác mong muốn:

> một app kiến trúc / interactive experience hiện đại nhưng mang không khí gia đình.

## 14.2. Color direction

- be;
- gỗ sáng;
- trắng ấm;
- xanh lá dịu.

## 14.3. Characters

Silhouette đơn giản.

Hạn chế chi tiết khuôn mặt để người chơi dễ tự chiếu mình vào nhân vật.

## 14.4. House

Ngôi nhà luôn hiện diện và thay đổi real-time.

Trạng thái tổng quan có thể biểu đạt:

```text
Vững
  ↓
Cân bằng
  ↓
Mất ổn định
  ↓
Nứt
  ↓
Gia cố
```

## 14.5. Sound

Nhạc nền và hiệu ứng âm thanh nhẹ nếu có thời gian:

- tiếng gạch đặt xuống;
- tiếng cửa mở;
- âm thanh thay đổi khi nền yếu;
- âm thanh tích cực khi nhà được gia cố.

Sound không được lấn át content.

---

# 15. INTERACTION DESIGN RULES

## 15.1. House-first interaction

Mọi lựa chọn quan trọng phải có thay đổi trực quan lên ngôi nhà.

## 15.2. Feedback hai lớp

### Layer 1 — Creative consequence

Ví dụ:

> Tường nghiêng.

### Layer 2 — Academic explanation

Ví dụ:

> **CK_FAM_17 — Vợ chồng bình đẳng**
>
> Giáo trình nhấn mạnh quyền và nghĩa vụ ngang nhau giữa vợ và chồng, đồng thời xóa bỏ đặc quyền gia trưởng.

## 15.3. Avoid answer language

Không dùng:

- “Đáp án đúng.”
- “Đáp án sai.”
- “Bạn trả lời đúng.”
- “Bạn trả lời sai.”

Nên dùng:

- “Kết cấu thay đổi…”
- “Lựa chọn này làm…”
- “Ngôi nhà vừa được gia cố…”
- “Một vết nứt xuất hiện…”
- “Không gian trong nhà thay đổi…”

## 15.4. Avoid moral judgment

Không viết:

> “Bạn là người ích kỷ.”

Nên viết:

> “Lựa chọn này khiến kết cấu bình đẳng của ngôi nhà suy yếu.”

---

# 16. KNOWLEDGE MAPPING

Mapping tổng thể:

| Content area | Knowledge IDs |
|---|---|
| Khái niệm gia đình | CK_FAM_01–04 |
| Vị trí gia đình | CK_FAM_05–07 |
| Chức năng gia đình | CK_FAM_08–11 |
| Cơ sở kinh tế – xã hội | CK_FAM_12–13 |
| Cơ sở chính trị – xã hội | CK_FAM_14 |
| Cơ sở văn hóa | CK_FAM_15 |
| Hôn nhân tự nguyện | CK_FAM_16 |
| Một vợ một chồng, bình đẳng | CK_FAM_17 |
| Hôn nhân được bảo đảm pháp lý | CK_FAM_18 |

### Scenario mapping

| Scenario | Knowledge |
|---|---|
| S01 | CK_FAM_17, CK_FAM_10 |
| S02 | CK_FAM_12, CK_FAM_13 |
| S03 | CK_FAM_09 |
| S04 | CK_FAM_15 |
| S05 | CK_FAM_14 |
| S06 | CK_FAM_16, CK_FAM_13, CK_FAM_17, CK_FAM_18 |
| S07 | CK_FAM_16, CK_FAM_17, CK_FAM_18, CK_FAM_05, CK_FAM_07 |

---

# 17. GROK TASK X3 — GAMEPLAY SYSTEM DESIGN

## Mục tiêu

Chuyển concept “xây nhà” thành gameplay có thể triển khai trên web.

### Phải thiết kế

1. Gameplay loop.
2. Choice → consequence mapping.
3. Score progression.
4. House visual state.
5. Unlock system.
6. Final profile.
7. Replay value.
8. Hidden paths nếu cần.

### Nguyên tắc

- Không có điểm số học thuật.
- Score chỉ là mechanic.
- Gameplay phải dễ hiểu trong vài phút đầu.
- Người chơi phải biết lựa chọn của mình vừa gây ra thay đổi gì.
- Không được tạo dependency backend nếu không cần.

### House state phải phản ánh score

```text
ECONOMY    → Foundation / Kitchen / Work area
EDUCATION  → Study / Play room
EQUALITY   → Balance / Main door
EMOTION    → Light / Relaxation / Family interaction
```

### Output X3

Grok phải tạo:

- gameplay state model ở mức concept;
- score rules;
- unlock rules;
- house state rules;
- final profile rules;
- replay mechanics;
- edge cases trong gameplay.

---

# 18. GROK TASK X4 — CREATIVE QA / ACADEMIC SAFETY QA

## Mục tiêu

Audit toàn bộ creative output trước khi đưa sang implementation.

### Kiểm tra Academic Leakage

Tìm các trường hợp:

- scenario vô tình tạo thêm kiến thức mới;
- feedback khẳng định điều không có trong Academic Source of Truth;
- creative metaphor bị viết như fact khoa học;
- score bị diễn giải thành đánh giá thực tế;
- terminology bị thay đổi nghĩa.

### Kiểm tra Scenario Quality

Mỗi scenario phải có:

- conflict;
- choice;
- consequence;
- feedback;
- knowledge mapping;
- gameplay consequence rõ ràng.

### Kiểm tra Tone

Phải:

- tự nhiên;
- gần với đời sống người trẻ Việt Nam;
- không quá giáo điều;
- không quá trẻ con;
- không biến thành moral lecture.

### Kiểm tra Game Experience

Người chơi phải cảm thấy:

> “Mình đang xây một ngôi nhà.”

không phải:

> “Mình đang làm một bài quiz.”

### Output X4

Bảng QA:

| Item | Result | Issue | Recommended correction |
|---|---|---|---|
| Academic fidelity | PASS/FAIL | ... | ... |
| Knowledge mapping | PASS/FAIL | ... | ... |
| Scenario quality | PASS/FAIL | ... | ... |
| Feedback quality | PASS/FAIL | ... | ... |
| Gameplay clarity | PASS/FAIL | ... | ... |
| Tone | PASS/FAIL | ... | ... |
| Score safety | PASS/FAIL | ... | ... |

Không được dùng `PASS` nếu chưa thực sự kiểm tra.

---

# 19. MVP SCOPE

## Must-have

- Landing
- Intro
- Game Home / House
- 7 scenarios
- 18 knowledge items
- Choice interaction
- Feedback
- Knowledge card
- 4 Family Score
- House state changes
- Unlock progression
- Final House
- Final Profile
- Reset / Replay cơ bản
- local persistence nếu triển khai

## Không cần cho MVP

- backend;
- authentication;
- database;
- leaderboard;
- multiplayer;
- AI chatbot;
- admin dashboard;
- analytics phức tạp;
- social account integration bắt buộc.

---

# 20. CONTENT QA RULES

## Academic QA

- [ ] CK_FAM_01–18 đầy đủ.
- [ ] Không thay đổi thuật ngữ MUST.
- [ ] Không thêm knowledge item ngoài Source of Truth.
- [ ] Mỗi claim học thuật truy xuất được về CK ID.

## Creative QA

- [ ] Concept NHÀ nhất quán.
- [ ] Metaphor nhà được dùng nhất quán.
- [ ] Scenario gần đời sống.
- [ ] Choice tạo hậu quả trực quan.
- [ ] Feedback không mang tính phán xét người chơi.
- [ ] Không biến game thành quiz.

## Gameplay QA

- [ ] 7 scenario đầy đủ.
- [ ] 4 Family Score tồn tại.
- [ ] Initial score 40/40/40/40.
- [ ] Range 0–100.
- [ ] Score là game mechanic.
- [ ] House thay đổi theo lựa chọn.
- [ ] Unlock hoạt động.
- [ ] Final Profile hoạt động.
- [ ] Replay có thể thực hiện.

---

# 21. IMPLEMENTATION HANDOFF

Sau khi Content Spec được khóa, không tiếp tục tự ý thay đổi nội dung trong quá trình code.

Chuỗi bàn giao:

```text
CONTENT_SPEC.md
      ↓
SCREEN FLOW
      ↓
SCREEN SPECIFICATION
      ↓
UI / UX MOCKUP
      ↓
GAME STATE + DATA MODEL
      ↓
IMPLEMENTATION
      ↓
QA / VERIFY
```

## Coding principle

Content phải data-driven.

Không hard-code scenario trong component.

Ví dụ đúng:

```ts
const scenario = scenarios[currentScenario];
```

Không nên:

```ts
if (scenarioId === "S01") {
  // render riêng toàn bộ scenario
}
```

Mục tiêu là:

> **Thay content không phải sửa UI logic.**

---

# 22. TECHNICAL DIRECTION

Stack dự kiến cho implementation:

- React
- TypeScript
- Vite
- CSS / CSS Variables
- Motion for React
- SVG
- React `useReducer`
- localStorage
- Vercel

Không bắt buộc dùng backend.

## Kiến trúc logic

```text
Content
  ↓
Game Data
  ↓
Game State / Reducer
  ↓
House State
  ↓
UI + Animation
```

## Suggested folders

```text
src/
├── app/
├── game/
├── content/
├── components/
├── pages/
├── styles/
└── assets/
```

---

# 23. FINAL CONTENT CHECKLIST BEFORE CODING

Trước khi bắt đầu coding, phải xác nhận:

- [ ] Academic Source of Truth đã khóa.
- [ ] `CK_FAM_01 → CK_FAM_18` đầy đủ.
- [ ] Creative Concept đã khóa.
- [ ] Storyline đã khóa.
- [ ] User Journey đã xác định.
- [ ] S01 → S07 đã có đầy đủ nội dung.
- [ ] Family Score wording đã dùng đúng phiên bản hiện tại.
- [ ] Family Score được ghi rõ là game mechanic.
- [ ] House mapping đã xác định.
- [ ] Unlock rules đã xác định.
- [ ] Final Profile đã xác định.
- [ ] Replay concept đã xác định.
- [ ] Academic / Creative boundary đã xác định.
- [ ] Những phần chưa đủ để implementation được đánh dấu rõ, không tự suy đoán.

---

# 24. ONE-SENTENCE PRODUCT DEFINITION

> **NHÀ là một web interactive learning game trong đó người chơi xây một ngôi nhà thông qua các lựa chọn đời sống, từ đó trực quan hóa và vận dụng kiến thức Chương 7 về khái niệm, vị trí, chức năng của gia đình và cơ sở xây dựng gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội.**

---

# 25. SOURCE HIERARCHY

Khi có mâu thuẫn giữa các tài liệu / agent output, ưu tiên theo thứ tự:

```text
1. Academic Source of Truth
        ↓
2. Approved Creative Specification
        ↓
3. Approved Gameplay Specification
        ↓
4. UI / UX Interpretation
        ↓
5. Technical Implementation
```

Không được để implementation làm thay đổi academic meaning.

Không được để creative freedom tạo thành academic claim.

Không được để Family Score trở thành scientific claim.

---

# END OF CONTEXT
