// Các trường dữ liệu bám sát theo cấu trúc bảng SanPham trong database
export interface Product {
  MaSP: string;            // VARCHAR(10) PRIMARY KEY
  TenSP: string;           // VARCHAR(50) NOT NULL
  MoTaSP: string;          // TEXT
  GiaBanHienTai: number;   // DECIMAL(18,2) NOT NULL
  MaNV: string;            // VARCHAR(10) FOREIGN KEY
  SoLuongConLai: number;   // INT (Dựa theo trigger cập nhật tồn kho)
}

// Gom chung các mảng (Flash Sale, Best Seller, Recommended) thành 1 list sản phẩm duy nhất
// vì database không có các cờ (flags) hay bảng lưu Flash Sale/Best Seller.
export const MOCK_PRODUCTS: Product[] = [
  {
    MaSP: 'p_001',
    TenSP: 'Tẩy Da Chết Mặt Cocoon Cà Phê Đắk Lắk 150ml',
    MoTaSP: 'Tẩy da chết dịu nhẹ, da mềm mại rạng rỡ',
    GiaBanHienTai: 120000,
    MaNV: 'NV01',
    SoLuongConLai: 50,
  },
  {
    MaSP: 'p_002',
    TenSP: '[100% Cotton] Bông Tẩy Trang Hotosu Cao Cấp 150 Miếng',
    MoTaSP: 'Bông tẩy trang cao cấp',
    GiaBanHienTai: 28000,
    MaNV: 'NV01',
    SoLuongConLai: 200,
  },
  {
    MaSP: 'p_003',
    TenSP: "Nước Tẩy Trang L'Oreal Làm Sạch Sâu 400ml",
    MoTaSP: 'Nước tẩy trang làm sạch sâu trang điểm',
    GiaBanHienTai: 162000,
    MaNV: 'NV02',
    SoLuongConLai: 40,
  },
  {
    MaSP: 'p_004',
    TenSP: 'Sữa Rửa Mặt CeraVe Cho Da Thường Đến Da Dầu',
    MoTaSP: 'Sữa rửa mặt chăm sóc da',
    GiaBanHienTai: 360000,
    MaNV: 'NV01',
    SoLuongConLai: 80,
  },
  {
    MaSP: 'p_101',
    TenSP: 'Serum The Ordinary Niacinamide 10% + Zinc 1% 30ml',
    MoTaSP: 'Serum thu nhỏ lỗ chân lông',
    GiaBanHienTai: 285000,
    MaNV: 'NV03',
    SoLuongConLai: 150,
  },
  {
    MaSP: 'p_102',
    TenSP: 'Innisfree Serum Dưỡng Ẩm Green Tea Seed 80ml',
    MoTaSP: 'Serum dưỡng ẩm trà xanh',
    GiaBanHienTai: 520000,
    MaNV: 'NV02',
    SoLuongConLai: 80,
  },
  {
    MaSP: 'p_201',
    TenSP: 'Nước Dưỡng Da Hatomugi Skin Conditioner 500ml',
    MoTaSP: 'Nước dưỡng ẩm chiết xuất ý dĩ',
    GiaBanHienTai: 195000,
    MaNV: 'NV01',
    SoLuongConLai: 120,
  },
  {
    MaSP: 'p_202',
    TenSP: 'Some By Mi AHA BHA PHA 30 Days Miracle Toner 150ml',
    MoTaSP: 'Toner hỗ trợ trị mụn',
    GiaBanHienTai: 355000,
    MaNV: 'NV03',
    SoLuongConLai: 55,
  }
];