import type { ScenarioData } from "../game/types";

export const SCENARIOS: Record<string, ScenarioData> = {
  S01: {
    id: "S01",
    title: "Ai làm việc nhà?",
    context: "Minh và Lan vừa tốt nghiệp, sống chung trong căn hộ nhỏ. Cả hai đều đi làm. Tối nay Lan về muộn vì họp, Minh đang ngồi xem điện thoại trong khi chén bát và quần áo chưa giặt. Lan đứng ở cửa nhìn cảnh tượng đó.",
    question: "Bạn sẽ quyết định như thế nào để tổ chức đời sống gia đình hôm nay?",
    choices: {
      A: {
        text: "“Em về muộn thì em làm đi, anh mệt rồi.”",
        consequence: "Tường phòng khách xuất hiện vết nứt nhỏ, một bên nghiêng.",
        feedback: "Lan ngồi im lặng, ánh sáng trong nhà dịu đi. “Anh nghĩ việc nhà là trách nhiệm của một mình em à?”",
        houseEffect: { zone: "structure", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_17"]
      },
      B: {
        text: "“Anh làm chén bát và giặt đồ, em nghỉ đi. Mai mình phân công lại cho công bằng.”",
        consequence: "Tường được gia cố, ánh sáng ấm lên, không gian cân bằng.",
        feedback: "Lan mỉm cười: “Cảm ơn anh. Như vậy mình mới thật sự là đối tác.”",
        houseEffect: { zone: "structure", kind: "reinforce" },
        relatedKnowledgeIds: ["CK_FAM_17"]
      },
      C: {
        text: "“Mình thuê người giúp việc mỗi tuần một buổi, còn lại chia đều công việc.”",
        consequence: "Không gian được tổ chức lại gọn gàng, thêm một góc tiện nghi.",
        feedback: "Cả hai đều cảm thấy nhẹ nhàng hơn. “Giải pháp này giúp mình giữ được sự công bằng lâu dài.”",
        houseEffect: { zone: "interior", kind: "light" },
        relatedKnowledgeIds: ["CK_FAM_17", "CK_FAM_10"]
      }
    }
  },
  S02: {
    id: "S02",
    title: "Ai là trụ cột?",
    context: "Tuấn vừa mất việc. Vợ anh – Hương – đang mang thai tháng thứ 5 và vẫn đi làm. Bố mẹ Tuấn gọi điện khuyên: “Con nên để Hương nghỉ việc ở nhà, con cố gắng tìm việc mới, đàn ông phải là trụ cột.”",
    question: "Bạn sẽ chọn cách ứng xử nào?",
    choices: {
      A: {
        text: "“Em nghỉ việc đi, anh sẽ lo kinh tế.”",
        consequence: "Nền móng kinh tế bị lún một bên, căn nhà nghiêng về phía phụ thuộc.",
        feedback: "Hương nói khẽ: “Em cảm thấy mình đang phụ thuộc về kinh tế.”",
        houseEffect: { zone: "foundation", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_12", "CK_FAM_13"]
      },
      B: {
        text: "“Em vẫn đi làm nếu muốn. Mình cùng tìm giải pháp, không ai phải phụ thuộc ai.”",
        consequence: "Nền móng được đổ đều, vững chắc hơn.",
        feedback: "Hương nắm tay Tuấn: “Cảm ơn anh vì không để kinh tế quyết định vị thế của mình.”",
        houseEffect: { zone: "foundation", kind: "build" },
        relatedKnowledgeIds: ["CK_FAM_12", "CK_FAM_13"]
      },
      C: {
        text: "“Mình tạm thời để em giảm giờ làm, anh nhận thêm công việc thời vụ, nhưng quyết định cuối cùng là của em.”",
        consequence: "Nền móng ổn định, có thêm một lớp gia cố linh hoạt.",
        feedback: "Cả hai cùng thở phào. “Mình vẫn giữ được sự tự chủ.”",
        houseEffect: { zone: "foundation", kind: "reinforce" },
        relatedKnowledgeIds: ["CK_FAM_12", "CK_FAM_13"]
      }
    }
  },
  S03: {
    id: "S03",
    title: "Ai dạy con?",
    context: "Bé An 5 tuổi nghịch phá làm vỡ lọ hoa. Bà nội muốn đánh đòn “cho nhớ”. Bố mẹ An đang tranh luận.",
    question: "Bạn chọn cách giáo dục nào?",
    choices: {
      A: {
        text: "Đồng ý để bà đánh đòn: “Trẻ con phải dạy nghiêm từ nhỏ.”",
        consequence: "Phòng học/chơi của trẻ trở nên tối và chật hẹp.",
        feedback: "An nép vào góc tường. Ánh sáng trong phòng dịu hẳn.",
        houseEffect: { zone: "study", kind: "dim" },
        relatedKnowledgeIds: ["CK_FAM_09"]
      },
      B: {
        text: "Bố mẹ ngồi xuống nói chuyện với An, giải thích vì sao không được phá đồ, rồi cùng dọn dẹp.",
        consequence: "Phòng học/chơi sáng lên, có thêm kệ sách và góc sáng tạo.",
        feedback: "An gật đầu: “Con hiểu rồi ạ.”",
        houseEffect: { zone: "study", kind: "light" },
        relatedKnowledgeIds: ["CK_FAM_09"]
      },
      C: {
        text: "Bố mẹ để bà dạy theo cách cũ, còn mình chỉ lo việc học chữ cho con.",
        consequence: "Phòng bị chia đôi, một nửa tối, một nửa sáng nhưng không kết nối.",
        feedback: "An trở nên lúng túng, không biết nghe ai.",
        houseEffect: { zone: "study", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_09"]
      }
    }
  },
  S04: {
    id: "S04",
    title: "Con trai hay con gái?",
    context: "Gia đình Hùng vừa sinh con gái thứ hai. Ông nội thở dài: “Nhà mình lại không có cháu đích tôn.” Một số họ hàng khuyên “sinh thêm cho có con trai”.",
    question: "Bạn sẽ phản ứng thế nào?",
    choices: {
      A: {
        text: "Đồng ý sinh thêm vì “phải có con trai nối dõi”.",
        consequence: "Tường nhà xuất hiện hoa văn cũ kỹ, nặng nề, ánh sáng bị che khuất.",
        feedback: "Vợ Hùng im lặng quay đi. Không khí trong nhà trở nên ngột ngạt.",
        houseEffect: { zone: "structure", kind: "dim" },
        relatedKnowledgeIds: ["CK_FAM_15"]
      },
      B: {
        text: "“Con gái hay con trai đều là con. Mình không chấp nhận tư tưởng trọng nam khinh nữ.”",
        consequence: "Hoa văn cũ bị gỡ bỏ, tường được sơn lại sáng và cân bằng.",
        feedback: "Vợ Hùng nắm tay chồng. “Cảm ơn anh.”",
        houseEffect: { zone: "structure", kind: "light" },
        relatedKnowledgeIds: ["CK_FAM_15"]
      },
      C: {
        text: "Im lặng không phản đối, nhưng cũng không sinh thêm.",
        consequence: "Hoa văn cũ vẫn còn, chỉ bị phủ một lớp sơn mỏng.",
        feedback: "Không khí trong nhà vẫn còn nặng nề.",
        houseEffect: { zone: "structure", kind: "reinforce" },
        relatedKnowledgeIds: ["CK_FAM_15"]
      }
    }
  },
  S05: {
    id: "S05",
    title: "Khi có bạo lực",
    context: "Mai bị chồng lớn tiếng đe dọa và đập đồ khi say. Hàng xóm khuyên “chuyện trong nhà thì giữ trong nhà”. Mai đang phân vân có nên nhờ đến pháp luật hay không.",
    question: "Bạn khuyên Mai làm gì?",
    choices: {
      A: {
        text: "“Cứ chịu đựng, chuyện vợ chồng không nên đưa ra ngoài.”",
        consequence: "Cửa chính bị khóa từ bên trong, không ai mở được.",
        feedback: "Mai ngồi trong góc tối. “Không ai bảo vệ được mình.”",
        houseEffect: { zone: "door", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_14"]
      },
      B: {
        text: "“Em nên tìm sự hỗ trợ từ cơ quan có thẩm quyền và các tổ chức bảo vệ phụ nữ. Đây là quyền hợp pháp của em.”",
        consequence: "Cửa chính được mở rộng, có thêm hệ thống bảo vệ rõ ràng.",
        feedback: "Mai thở phào: “Cuối cùng mình cũng được bảo vệ.”",
        houseEffect: { zone: "door", kind: "open" },
        relatedKnowledgeIds: ["CK_FAM_14"]
      },
      C: {
        text: "“Em chỉ nên bỏ về nhà ngoại, đừng làm lớn chuyện.”",
        consequence: "Cửa sổ được mở nhưng cửa chính vẫn khóa.",
        feedback: "Mai rời đi nhưng vẫn mang theo nỗi sợ.",
        houseEffect: { zone: "door", kind: "dim" },
        relatedKnowledgeIds: ["CK_FAM_14"]
      }
    }
  },
  S06: {
    id: "S06",
    title: "Kết hôn vì yêu hay vì hoàn cảnh?",
    context: "Nam và Hà yêu nhau 3 năm. Gia đình Hà thúc giục cưới vì “đủ tuổi” và nhà trai có điều kiện. Nam cảm thấy chưa sẵn sàng về tài chính và cả hai chưa thật sự chắc chắn về tương lai.",
    question: "Bạn chọn hướng đi nào?",
    choices: {
      A: {
        text: "Cưới vì áp lực gia đình và điều kiện kinh tế.",
        consequence: "Cửa chính được dựng vội, lệch lạc, thiếu độ vững.",
        feedback: "Hà nói khẽ: “Mình cưới vì áp lực chứ không phải vì mình đã sẵn sàng.”",
        houseEffect: { zone: "door", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_16", "CK_FAM_13"]
      },
      B: {
        text: "Hai người quyết định chờ thêm, chỉ kết hôn khi cả hai thật sự sẵn sàng và tự nguyện.",
        consequence: "Cửa chính được thiết kế chắc chắn, cân đối, có thể mở hai chiều.",
        feedback: "Nam nắm tay Hà: “Mình sẽ bước vào khi cả hai đều muốn.”",
        houseEffect: { zone: "door", kind: "build" },
        relatedKnowledgeIds: ["CK_FAM_16", "CK_FAM_17", "CK_FAM_18"]
      },
      C: {
        text: "Cưới nhưng không đăng ký kết hôn, “sống thử thêm”.",
        consequence: "Cửa chính chỉ là tấm rèm, không có khung pháp lý.",
        feedback: "Khi có mâu thuẫn, không ai được bảo vệ rõ ràng.",
        houseEffect: { zone: "door", kind: "dim" },
        relatedKnowledgeIds: ["CK_FAM_18"]
      }
    }
  },
  S07: {
    id: "S07",
    title: "Ngôi nhà hoàn thiện",
    context: "Sau nhiều quyết định, ngôi nhà đã gần xong. Người chơi được nhìn lại toàn bộ và đưa ra lựa chọn cuối cùng về “luật sống” trong nhà.",
    question: "Bạn muốn ngôi nhà này vận hành theo nguyên tắc nào?",
    choices: {
      A: {
        text: "“Đàn ông quyết định lớn, phụ nữ lo việc nhà và con cái.”",
        consequence: "Toàn bộ ngôi nhà nghiêng rõ rệt, nhiều vết nứt cũ tái hiện.",
        feedback: "Các thành viên nữ im lặng. Ánh sáng yếu dần.",
        houseEffect: { zone: "structure", kind: "crack" },
        relatedKnowledgeIds: ["CK_FAM_17", "CK_FAM_15", "CK_FAM_12"]
      },
      B: {
        text: "“Mọi quyết định lớn đều được bàn bạc bình đẳng. Tình yêu, trách nhiệm và pháp luật là nền tảng.”",
        consequence: "Ngôi nhà sáng lên, vững chắc, các không gian kết nối hài hòa.",
        feedback: "Cả gia đình ngồi sum họp dưới ánh sáng ấm. “Đây mới thật sự là nhà của chúng ta.”",
        houseEffect: { zone: "structure", kind: "reinforce" },
        relatedKnowledgeIds: ["CK_FAM_16", "CK_FAM_17", "CK_FAM_18", "CK_FAM_05", "CK_FAM_07"]
      },
      C: {
        text: "“Ai mạnh thì quyết, miễn là kinh tế ổn.”",
        consequence: "Nhà đẹp về vật chất nhưng lạnh lẽo, thiếu kết nối tình cảm.",
        feedback: "Các thành viên sống trong cùng một mái nhà nhưng ít nói chuyện.",
        houseEffect: { zone: "interior", kind: "dim" },
        relatedKnowledgeIds: ["CK_FAM_13", "CK_FAM_11"]
      }
    }
  }
};
