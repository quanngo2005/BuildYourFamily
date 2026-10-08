export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
}

export const KNOWLEDGE_ITEMS: Record<string, KnowledgeItem> = {
  CK_FAM_01: {
    id: "CK_FAM_01",
    title: "Định nghĩa gia đình",
    content: "Gia đình là một hình thức cộng đồng xã hội đặc biệt, được hình thành, duy trì và củng cố chủ yếu dựa trên cơ sở quan hệ hôn nhân, quan hệ huyết thống và quan hệ nuôi dưỡng, cùng với những quy định về quyền và nghĩa vụ của các thành viên."
  },
  CK_FAM_02: {
    id: "CK_FAM_02",
    title: "Quan hệ hôn nhân",
    content: "Là cơ sở, nền tảng ban đầu hình thành nên gia đình và là căn cứ pháp lý cho sự tồn tại hợp pháp của mỗi gia đình."
  },
  CK_FAM_03: {
    id: "CK_FAM_03",
    title: "Quan hệ huyết thống",
    content: "Là mối quan hệ tự nhiên giữa những người cùng chung dòng máu, nảy sinh từ quan hệ hôn nhân, đóng vai trò gắn kết bền chặt nhất giữa các thành viên trong gia đình."
  },
  CK_FAM_04: {
    id: "CK_FAM_04",
    title: "Quan hệ nuôi dưỡng",
    content: "Xuất phát từ trách nhiệm, nghĩa vụ chăm sóc, bảo bọc lẫn nhau giữa các thế hệ (bao gồm cha mẹ nuôi – con nuôi hợp pháp), thể hiện đạo lý và trách nhiệm xã hội."
  },
  CK_FAM_05: {
    id: "CK_FAM_05",
    title: "Gia đình là tế bào của xã hội",
    content: "Gia đình có vai trò quyết định đối với sự tồn tại, vận động và phát triển của toàn xã hội; là hạt nhân xã hội như Hồ Chí Minh khẳng định: \"Gia đình tốt thì xã hội mới tốt\"."
  },
  CK_FAM_06: {
    id: "CK_FAM_06",
    title: "Gia đình là tổ ấm mang lại hạnh phúc cho cá nhân",
    content: "Gia đình là môi trường an toàn và lành mạnh nhất về thể chất, tâm lý, tình cảm để mỗi cá nhân được che chở, nuôi dưỡng, trưởng thành và phát triển toàn diện."
  },
  CK_FAM_07: {
    id: "CK_FAM_07",
    title: "Gia đình là cầu nối giữa cá nhân và xã hội",
    content: "Là cộng đồng đầu tiên thực hiện xã hội hóa cá nhân và là lăng kính tiếp nhận, sàng lọc các chủ trương, chính sách, tác động từ xã hội tới từng cá nhân."
  },
  CK_FAM_08: {
    id: "CK_FAM_08",
    title: "Chức năng tái sản xuất ra con người",
    content: "Là chức năng đặc thù duy nhất chỉ có ở gia đình; nhằm đáp ứng nhu cầu tâm – sinh lý tự nhiên, duy trì nòi giống dòng họ và cung cấp nguồn lao động mới cho xã hội."
  },
  CK_FAM_09: {
    id: "CK_FAM_09",
    title: "Chức năng nuôi dưỡng, giáo dục",
    content: "Thể hiện tình cảm thiêng liêng, trách nhiệm của cha mẹ đối với con cái; định hình nhân cách, đạo đức, lối sống ban đầu qua sự phối hợp giữa gia đình, nhà trường và xã hội."
  },
  CK_FAM_10: {
    id: "CK_FAM_10",
    title: "Chức năng kinh tế và tổ chức tiêu dùng",
    content: "Gia đình vừa là đơn vị tham gia sản xuất, cung ứng sức lao động, vừa là đơn vị tiêu dùng quan trọng; chịu trách nhiệm phân công lao động nội bộ và quản lý ngân sách gia đình."
  },
  CK_FAM_11: {
    id: "CK_FAM_11",
    title: "Chức năng thỏa mãn nhu cầu tâm - sinh lý, tình cảm",
    content: "Duy trì cân bằng tinh thần, chia sẻ tình cảm, là chỗ dựa tâm lý an toàn nhất cho cá nhân; giúp hóa giải áp lực xã hội và ngăn ngừa tệ nạn xã hội xâm nhập."
  },
  CK_FAM_12: {
    id: "CK_FAM_12",
    title: "Cơ sở kinh tế – xã hội xây dựng gia đình mới",
    content: "Phát triển lực lượng sản xuất và thiết lập chế độ công hữu tư liệu sản xuất chủ yếu, xóa bỏ cội nguồn áp bức kinh tế và sự lệ thuộc của phụ nữ vào nam giới."
  },
  CK_FAM_13: {
    id: "CK_FAM_13",
    title: "Nền tảng kinh tế của tình yêu chân chính",
    content: "Việc xóa bỏ chế độ tư hữu tư liệu sản xuất giúp giải phóng hôn nhân khỏi các tính toán vụ lợi về tài sản, địa vị xã hội, đưa tình yêu trở thành cơ sở đích thực của hôn nhân."
  },
  CK_FAM_14: {
    id: "CK_FAM_14",
    title: "Cơ sở chính trị – xã hội xây dựng gia đình mới",
    content: "Thiết lập Nhà nước XHCN nhằm giải phóng con người; ban hành và thực thi hệ thống pháp luật (Luật Hôn nhân và Gia đình, Bình đẳng giới...) để bảo vệ các thành viên, nhất là phụ nữ và trẻ em."
  },
  CK_FAM_15: {
    id: "CK_FAM_15",
    title: "Cơ sở văn hóa xây dựng gia đình mới",
    content: "Định hướng đời sống tinh thần theo hệ tư tưởng giai cấp công nhân; nâng cao dân trí; xóa bỏ hủ tục, thói gia trưởng, phong kiến \"trọng nam khinh nữ\"; xây dựng hệ giá trị văn hóa tiến bộ."
  },
  CK_FAM_16: {
    id: "CK_FAM_16",
    title: "Nguyên tắc Hôn nhân tự nguyện",
    content: "Hôn nhân xuất phát từ tình yêu nam nữ chân chính, tự do kết hôn không ép buộc; bao hàm quyền tự do ly hôn chính đáng khi tình cảm thực sự tan vỡ (không chấp nhận ly hôn tùy tiện)."
  },
  CK_FAM_17: {
    id: "CK_FAM_17",
    title: "Nguyên tắc Một vợ một chồng, vợ chồng bình đẳng",
    content: "Điều kiện tiên quyết bảo đảm hạnh phúc gia đình; xóa bỏ đặc quyền gia trưởng của nam giới; bảo đảm vợ và chồng có quyền và nghĩa vụ ngang nhau về mọi mặt."
  },
  CK_FAM_18: {
    id: "CK_FAM_18",
    title: "Nguyên tắc Hôn nhân được bảo đảm về mặt pháp lý",
    content: "Kết hôn phải đăng ký tại cơ quan nhà nước có thẩm quyền; thể hiện trách nhiệm công dân và tạo căn cứ pháp lý bảo vệ quyền lợi phụ nữ và trẻ nhỏ trước rủi ro, tranh chấp."
  }
};
