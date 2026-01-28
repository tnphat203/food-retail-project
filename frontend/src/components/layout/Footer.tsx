export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">GoSnack</h3>
          <p>Đồ ăn vặt yêu thích – giao nhanh, luôn tươi mỗi ngày.</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Công ty</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-orange-500">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Sản phẩm
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Hỗ trợ</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:text-orange-500">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Giao hàng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500">
                Đổi trả
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Liên hệ</h4>
          <p>Email: support@gosnack.vn</p>
          <p>Hotline: 0900 123 456</p>
        </div>
      </div>

      <div className="border-t text-center py-4 text-xs text-gray-500">
        © 2026 GoSnack. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
