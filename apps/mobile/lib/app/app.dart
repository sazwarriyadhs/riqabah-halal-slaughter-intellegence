import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import 'package:signature/signature.dart';
import 'package:image_picker/image_picker.dart';
import '../core/auth/auth_repository.dart';
import '../core/storage/RIQABAH_session_storage.dart';
import 'theme.dart';

class RIQABAHMobileApp extends StatelessWidget {
  const RIQABAHMobileApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RIQABAH Mobile',
      debugShowCheckedModeBanner: false,
      theme: buildRIQABAHTheme(),
      home: const RIQABAHLoginScreen(),
    );
  }
}

class T {
  static const translations = {
    'en': {
      'welcome': 'Welcome back', 'sign_in': 'Sign in to your RIQABAH Field Auditor workspace.',
      'email': 'EMAIL', 'password': 'PASSWORD', 'sign_in_btn': 'SIGN IN',
      'assalamualaikum': 'ASSALAMUALAIKUM,', 'auditor': 'AUDITOR',
      'available': 'Available for Assignment', 'performance': 'YOUR AUDIT PERFORMANCE',
      'assigned': 'ASSIGNED', 'completed': 'COMPLETED', 'ongoing': 'ONGOING', 'pending': 'PENDING',
      'my_assignments': 'MY ASSIGNMENTS', 'see_all': 'SEE ALL',
      'active_audit': 'ACTIVE AUDIT', 'premises_inspection': 'Premises Inspection',
      'business': 'Business', 'organization': 'Organization', 'audit_id': 'Audit ID',
      'progress': 'Progress', 'open_audit': 'OPEN AUDIT',
      'workspace': 'AUDIT WORKSPACE', 'actions': 'Actions', 'documents': 'Documents',
      'traceability': 'Traceability', 'audits': 'Audits', 'checklist': 'Checklist',
      'evidence': 'Evidence', 'findings': 'Findings', 'verification': 'Verification',
      'gps_ready': 'GPS STATUS: READY', 'last_location': 'Last location verification',
      'home': 'HOME', 'audit': 'AUDIT', 'report': 'REPORT', 'profile': 'PROFILE',
      'total_checks': 'Total Checks', 'passed': 'Passed', 'failed': 'Failed',
      'open_findings': 'Open Findings', 'critical_findings': 'Critical Findings',
      'pending_capa': 'Pending CAPA',
      'profile_name': 'Azwar Riyadh Subarkah', 'role': 'Field Auditor',
      'logout': 'Logout', 'settings': 'Settings', 'notifications': 'Notifications',
      'reports_title': 'Reports', 'reports_desc': 'Your audit reports',
      'add_audit': 'Add Audit', 'edit_audit': 'Edit Audit', 'delete_audit': 'Delete Audit',
      'audit_title': 'Audit Title', 'audit_status': 'Status', 'save': 'Save', 'cancel': 'Cancel',
      'confirm_delete': 'Are you sure you want to delete this audit?',
      'signature_title': 'Digital Signature',
      'signature_draw': 'Draw Signature',
      'signature_upload': 'Upload Signature',
      'signature_clear': 'Clear',
      'signature_save': 'Save Signature',
      'signature_required': 'Please provide your signature.',
    },
    'id': {
      'welcome': 'Selamat Datang', 'sign_in': 'Masuk ke ruang kerja Auditor RIQABAH.',
      'email': 'EMAIL', 'password': 'KATA SANDI', 'sign_in_btn': 'MASUK',
      'assalamualaikum': 'ASSALAMUALAIKUM,', 'auditor': 'AUDITOR',
      'available': 'Tersedia untuk Penugasan', 'performance': 'PERFORMA AUDIT ANDA',
      'assigned': 'DITUGASKAN', 'completed': 'SELESAI', 'ongoing': 'BERLANGSUNG', 'pending': 'TERTUNDA',
      'my_assignments': 'TUGAS SAYA', 'see_all': 'LIHAT SEMUA',
      'active_audit': 'AUDIT AKTIF', 'premises_inspection': 'Inspeksi Premis',
      'business': 'Bisnis', 'organization': 'Organisasi', 'audit_id': 'ID Audit',
      'progress': 'Kemajuan', 'open_audit': 'BUKA AUDIT',
      'workspace': 'RUANG KERJA AUDIT', 'actions': 'Tindakan', 'documents': 'Dokumen',
      'traceability': 'Ketertelusuran', 'audits': 'Audit', 'checklist': 'Daftar Periksa',
      'evidence': 'Bukti', 'findings': 'Temuan', 'verification': 'Verifikasi',
      'gps_ready': 'STATUS GPS: SIAP', 'last_location': 'Verifikasi lokasi terakhir',
      'home': 'BERANDA', 'audit': 'AUDIT', 'report': 'LAPORAN', 'profile': 'PROFIL',
      'total_checks': 'Total Pemeriksaan', 'passed': 'Lulus', 'failed': 'Gagal',
      'open_findings': 'Temuan Terbuka', 'critical_findings': 'Temuan Kritis',
      'pending_capa': 'CAPA Tertunda',
      'profile_name': 'Azwar Riyadh Subarkah', 'role': 'Auditor Lapangan',
      'logout': 'Keluar', 'settings': 'Pengaturan', 'notifications': 'Notifikasi',
      'reports_title': 'Laporan', 'reports_desc': 'Laporan audit Anda',
      'add_audit': 'Tambah Audit', 'edit_audit': 'Edit Audit', 'delete_audit': 'Hapus Audit',
      'audit_title': 'Judul Audit', 'audit_status': 'Status', 'save': 'Simpan', 'cancel': 'Batal',
      'confirm_delete': 'Yakin ingin menghapus audit ini?',
      'signature_title': 'Tanda Tangan Digital',
      'signature_draw': 'Gambar Tanda Tangan',
      'signature_upload': 'Unggah Tanda Tangan',
      'signature_clear': 'Hapus',
      'signature_save': 'Simpan Tanda Tangan',
      'signature_required': 'Mohon berikan tanda tangan Anda.',
    },
    'ar': {
      'welcome': 'مرحبا بعودتك', 'sign_in': 'تسجيل الدخول إلى مساحة عمل المدقق RIQABAH.',
      'email': 'البريد الإلكتروني', 'password': 'كلمة المرور', 'sign_in_btn': 'تسجيل الدخول',
      'assalamualaikum': 'السلام عليكم،', 'auditor': 'المدقق',
      'available': 'متاح للتكليف', 'performance': 'أداء التدقيق الخاص بك',
      'assigned': 'مكلف', 'completed': 'مكتمل', 'ongoing': 'جارٍ', 'pending': 'معلق',
      'my_assignments': 'مهامي', 'see_all': 'عرض الكل',
      'active_audit': 'تدقيق نشط', 'premises_inspection': 'تفتيش المباني',
      'business': 'الأعمال', 'organization': 'المنظمة', 'audit_id': 'معرف التدقيق',
      'progress': 'التقدم', 'open_audit': 'فتح التدقيق',
      'workspace': 'مساحة عمل التدقيق', 'actions': 'الإجراءات', 'documents': 'المستندات',
      'traceability': 'التتبع', 'audits': 'التدقيق', 'checklist': 'قائمة التحقق',
      'evidence': 'الأدلة', 'findings': 'النتائج', 'verification': 'التحقق',
      'gps_ready': 'حالة GPS: جاهز', 'last_location': 'التحقق من الموقع الأخير',
      'home': 'الرئيسية', 'audit': 'التدقيق', 'report': 'تقرير', 'profile': 'الملف الشخصي',
      'total_checks': 'إجمالي الفحوصات', 'passed': 'تم الاجتياز', 'failed': 'فشل',
      'open_findings': 'النتائج المفتوحة', 'critical_findings': 'النتائج الحرجة',
      'pending_capa': 'CAPA المعلقة',
      'profile_name': 'Azwar Riyadh Subarkah', 'role': 'مدقق ميداني',
      'logout': 'تسجيل الخروج', 'settings': 'الإعدادات', 'notifications': 'الإشعارات',
      'reports_title': 'التقارير', 'reports_desc': 'تقارير التدقيق الخاصة بك',
      'add_audit': 'إضافة تدقيق', 'edit_audit': 'تعديل التدقيق', 'delete_audit': 'حذف التدقيق',
      'audit_title': 'عنوان التدقيق', 'audit_status': 'الحالة', 'save': 'حفظ', 'cancel': 'إلغاء',
      'confirm_delete': 'هل أنت متأكد من حذف هذا التدقيق؟',
      'signature_title': 'التوقيع الرقمي',
      'signature_draw': 'رسم التوقيع',
      'signature_upload': 'رفع التوقيع',
      'signature_clear': 'مسح',
      'signature_save': 'حفظ التوقيع',
      'signature_required': 'يرجى تقديم توقيعك.',
    },
  };
  static String get(String key, String lang) =>
      translations[lang]?[key] ?? translations['en']?[key] ?? key;
}

class Audit {
  String id;
  String title;
  String status;
  Audit({required this.id, required this.title, required this.status});
}

class RIQABAHLoginScreen extends StatefulWidget {
  const RIQABAHLoginScreen({super.key});
  @override
  State<RIQABAHLoginScreen> createState() => _RIQABAHLoginScreenState();
}

class _RIQABAHLoginScreenState extends State<RIQABAHLoginScreen> {
  final _email = TextEditingController();
  final _pass = TextEditingController();
  bool _loading = false;
  String _lang = 'en';

  Future<void> _submit() async {
    if (_email.text.trim().isEmpty || _pass.text.isEmpty) return;
    setState(() => _loading = true);
    try {
      await RIQABAHAuthRepository().login(login: _email.text.trim(), password: _pass.text);
      if (mounted) {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
            builder: (_) => AuditorHomePage(lang: _lang)));
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Login failed: ${e.toString()}')));
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: RIQABAHColors.background,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(32),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                    const SizedBox(width: 60),
                    Expanded(child: Center(child: Image.asset('assets/logo/mobile_auditor_logo.png', width: 160))),
                    _langSelector(),
                  ]),
                  const SizedBox(height: 34),
                  Text(T.get('welcome', _lang), style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 6),
                  Text(T.get('sign_in', _lang), style: const TextStyle(fontSize: 12, color: Colors.grey)),
                  const SizedBox(height: 28),
                  Text(T.get('email', _lang), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey)),
                  const SizedBox(height: 7),
                  TextField(controller: _email, decoration: const InputDecoration(hintText: 'auditor@example.com', prefixIcon: Icon(Icons.mail_outline))),
                  const SizedBox(height: 18),
                  Text(T.get('password', _lang), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey)),
                  const SizedBox(height: 7),
                  TextField(controller: _pass, obscureText: true, decoration: const InputDecoration(hintText: 'Enter your password', prefixIcon: Icon(Icons.lock_outline))),
                  const SizedBox(height: 24),
                  SizedBox(width: double.infinity, height: 46, child: FilledButton(
                    onPressed: _loading ? null : _submit,
                    child: _loading ? const CircularProgressIndicator(color: Colors.white) : Text(T.get('sign_in_btn', _lang)),
                  )),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _langSelector() {
    return Container(
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(6)),
      child: Row(children: ['en', 'id', 'ar'].map((code) {
        final active = _lang == code;
        return GestureDetector(
          onTap: () => setState(() => _lang = code),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(color: active ? RIQABAHColors.green700 : Colors.transparent, borderRadius: BorderRadius.circular(4)),
            child: Text(code.toUpperCase(), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: active ? Colors.white : Colors.grey[600])),
          ),
        );
      }).toList()),
    );
  }
}

class AuditorHomePage extends StatefulWidget {
  final String lang;
  const AuditorHomePage({super.key, required this.lang});
  @override
  State<AuditorHomePage> createState() => _AuditorHomePageState();
}

class _AuditorHomePageState extends State<AuditorHomePage> {
  int _tabIndex = 0;
  bool _loading = true;
  Map<String, dynamic>? _data;
  String? _error;
  String _lang = 'en';
  List<Audit> _audits = [];

  // Tanda tangan
  Uint8List? _signatureBytes;
  final SignatureController _signatureController = SignatureController(
    penStrokeWidth: 3,
    penColor: RIQABAHColors.green900,
    exportBackgroundColor: Colors.white,
  );

  @override
  void initState() {
    super.initState();
    _lang = widget.lang;
    _load();
  }

  @override
  void dispose() {
    _signatureController.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final storage = RIQABAHSessionStorage();
      final token = await storage.readAccessToken();
      if (token == null) throw Exception('No token');
      final data = await SummaryRepository().fetchSummary(token);
      setState(() {
        _data = data;
        final h = data['halal'] ?? {};
        final count = h['checks_today'] ?? 0;
        _audits = List.generate(count, (i) => Audit(
          id: 'AUD-${DateTime.now().year}-${(i + 1).toString().padLeft(3, '0')}',
          title: 'Halal Compliance Audit ${i + 1}',
          status: i < (h['pass'] ?? 0) ? 'Completed' : 'Pending',
        ));
      });
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: RIQABAHColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Image.asset('assets/logo/mobile_auditor_logo.png', width: 100),
        actions: [
          IconButton(icon: const Icon(Icons.notifications_none, color: RIQABAHColors.text), onPressed: () {}),
          IconButton(icon: const Icon(Icons.settings_outlined, color: RIQABAHColors.text), onPressed: () {}),
          _langSelector(),
          const SizedBox(width: 8),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: RIQABAHColors.green700))
          : _error != null
              ? Center(child: Text('Error: $_error', style: const TextStyle(color: Colors.red)))
              : _buildPageContent(),
      bottomNavigationBar: _bottomNav(),
      floatingActionButton: _tabIndex == 1
          ? FloatingActionButton(
              backgroundColor: RIQABAHColors.green700,
              onPressed: () => _showAuditDialog(),
              child: const Icon(Icons.add, color: Colors.white),
            )
          : null,
    );
  }

  Widget _langSelector() {
    return Container(
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(color: Colors.grey[200], borderRadius: BorderRadius.circular(6)),
      child: Row(children: ['en', 'id', 'ar'].map((code) {
        final active = _lang == code;
        return GestureDetector(
          onTap: () => setState(() => _lang = code),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
            decoration: BoxDecoration(color: active ? RIQABAHColors.green700 : Colors.transparent, borderRadius: BorderRadius.circular(4)),
            child: Text(code.toUpperCase(), style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: active ? Colors.white : Colors.grey[600])),
          ),
        );
      }).toList()),
    );
  }

  Widget _bottomNav() {
    return BottomNavigationBar(
      currentIndex: _tabIndex,
      onTap: (i) => setState(() => _tabIndex = i),
      selectedItemColor: RIQABAHColors.green700,
      unselectedItemColor: Colors.grey,
      type: BottomNavigationBarType.fixed,
      items: [
        BottomNavigationBarItem(icon: const Icon(Icons.home_outlined), label: T.get('home', _lang)),
        BottomNavigationBarItem(icon: const Icon(Icons.assignment_outlined), label: T.get('audit', _lang)),
        BottomNavigationBarItem(icon: const Icon(Icons.description_outlined), label: T.get('report', _lang)),
        BottomNavigationBarItem(icon: const Icon(Icons.person_outline), label: T.get('profile', _lang)),
      ],
    );
  }

  Widget _buildPageContent() {
    switch (_tabIndex) {
      case 0: return _buildDashboard();
      case 1: return _buildAuditsPage();
      case 2: return _buildReportsPage();
      case 3: return _buildProfilePage();
      default: return _buildDashboard();
    }
  }

  // ============ DASHBOARD ============
  Widget _buildDashboard() {
    final h = _data?['halal'] ?? {};
    final a = _data?['alerts'] ?? {};
    final assigned = h['checks_today'] ?? 0;
    final completed = h['pass'] ?? 0;
    final ongoing = (assigned - completed).clamp(0, assigned);
    final pending = a['open'] ?? 0;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Stack(
              children: [
                Image.asset('assets/logo/cover-auditor.jpg', width: double.infinity, height: 220, fit: BoxFit.cover,
                  errorBuilder: (c, e, s) => Container(height: 220, color: RIQABAHColors.green700)),
                Positioned.fill(child: Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.black.withOpacity(0.1), Colors.black.withOpacity(0.75)])))),
                Positioned(top: 16, left: 16, right: 16, bottom: 16, child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
                      child: const Text('FIELD ASSURANCE', style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: 1.2))),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(T.get('assalamualaikum', _lang), style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.white.withOpacity(0.8), letterSpacing: 1.2)),
                        const SizedBox(height: 4),
                        Text(T.get('auditor', _lang), style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: Colors.white)),
                        const Text('Azwar Riyadh Subarkah', style: TextStyle(fontSize: 13, color: Colors.white70, fontWeight: FontWeight.w500)),
                        const SizedBox(height: 6),
                        Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3), decoration: BoxDecoration(color: Colors.green[400], borderRadius: BorderRadius.circular(20)),
                          child: Row(mainAxisSize: MainAxisSize.min, children: [
                            Container(width: 5, height: 5, decoration: const BoxDecoration(color: Colors.white, shape: BoxShape.circle)),
                            const SizedBox(width: 5),
                            Text(T.get('available', _lang), style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: Colors.white)),
                          ])),
                      ],
                    ),
                  ],
                )),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Text(T.get('performance', _lang), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Colors.grey, letterSpacing: 1.0)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 2, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12, crossAxisSpacing: 12, childAspectRatio: 1.4,
            children: [
              _imageCard(assigned.toString(), T.get('assigned', _lang), 'assets/cards/assigned.jpg', RIQABAHColors.green700),
              _imageCard(completed.toString(), T.get('completed', _lang), 'assets/cards/completed.jpg', Colors.blue),
              _imageCard(ongoing.toString(), T.get('ongoing', _lang), 'assets/cards/ongoing.jpg', Colors.orange),
              _imageCard(pending.toString(), T.get('pending', _lang), 'assets/cards/pending.jpg', Colors.red),
            ],
          ),
          const SizedBox(height: 24),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text(T.get('my_assignments', _lang), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Colors.grey, letterSpacing: 1.0)),
            Text(T.get('see_all', _lang), style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: RIQABAHColors.green700)),
          ]),
          const SizedBox(height: 12),
          _assignmentCard(),
          const SizedBox(height: 24),
          Text(T.get('workspace', _lang), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: Colors.grey, letterSpacing: 1.0)),
          const SizedBox(height: 12),
          GridView.count(
            crossAxisCount: 4, shrinkWrap: true, physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: 12, crossAxisSpacing: 8, childAspectRatio: 0.8,
            children: [
              _workspaceItem(Icons.assignment, T.get('audits', _lang)),
              _workspaceItem(Icons.fact_check, T.get('checklist', _lang)),
              _workspaceItem(Icons.photo_camera, T.get('evidence', _lang)),
              _workspaceItem(Icons.warning_amber, T.get('findings', _lang)),
              _workspaceItem(Icons.build, T.get('actions', _lang)),
              _workspaceItem(Icons.verified, T.get('verification', _lang)),
              _workspaceItem(Icons.description, T.get('documents', _lang)),
              _workspaceItem(Icons.timeline, T.get('traceability', _lang)),
            ],
          ),
          const SizedBox(height: 24),
          Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey[200]!)),
            child: Row(children: [
              const Icon(Icons.location_on, color: RIQABAHColors.green700),
              const SizedBox(width: 12),
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(T.get('gps_ready', _lang), style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800)),
                Text(T.get('last_location', _lang), style: const TextStyle(fontSize: 10, color: Colors.grey)),
              ]),
            ])),
          const SizedBox(height: 20),
        ],
      ),
    );
  }

  Widget _imageCard(String value, String label, String imagePath, Color color) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(imagePath, fit: BoxFit.cover, errorBuilder: (c, e, s) => Container(color: color)),
          Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.transparent, color.withOpacity(0.8)]))),
          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(value, style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w900, color: Colors.white)),
                Text(label, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.white, letterSpacing: 0.8)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _assignmentCard() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.grey[200]!)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4), decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(6)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Container(width: 6, height: 6, decoration: const BoxDecoration(color: Colors.green, shape: BoxShape.circle)),
              const SizedBox(width: 6),
              Text(T.get('active_audit', _lang), style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.green)),
            ])),
          const SizedBox(height: 14),
          Text(T.get('premises_inspection', _lang), style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text('${T.get('business', _lang)}: ${T.get('organization', _lang)}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
          Text('${T.get('audit_id', _lang)}: AUD-2026-001', style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(height: 16),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Text(T.get('progress', _lang), style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700)),
            const Text('65%', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: RIQABAHColors.green700)),
          ]),
          const SizedBox(height: 6),
          ClipRRect(borderRadius: BorderRadius.circular(4), child: LinearProgressIndicator(value: 0.65, minHeight: 6, backgroundColor: Colors.grey[200], valueColor: const AlwaysStoppedAnimation<Color>(RIQABAHColors.green700))),
          const SizedBox(height: 16),
          SizedBox(width: double.infinity, height: 40, child: OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(foregroundColor: RIQABAHColors.green700, side: const BorderSide(color: RIQABAHColors.green700), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
              Text(T.get('open_audit', _lang), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12)),
              const SizedBox(width: 6),
              const Icon(Icons.arrow_forward, size: 16),
            ]),
          )),
        ],
      ),
    );
  }

  Widget _workspaceItem(IconData icon, String label) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey[200]!)),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Icon(icon, color: RIQABAHColors.green700, size: 24),
        const SizedBox(height: 6),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Text(label, textAlign: TextAlign.center, style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w700, color: Colors.grey)),
        ),
      ]),
    );
  }

  // ============ AUDITS ============
  Widget _buildAuditsPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('Audits', style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
              const SizedBox(height: 4),
              Text('YOUR AUDIT DATA', style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey, letterSpacing: 1.0)),
            ]),
            ElevatedButton.icon(
              onPressed: () => _showAuditDialog(),
              icon: const Icon(Icons.add, size: 16),
              label: Text(T.get('add_audit', _lang)),
              style: ElevatedButton.styleFrom(backgroundColor: RIQABAHColors.green700, foregroundColor: Colors.white, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
            ),
          ]),
          const SizedBox(height: 16),
          if (_audits.isEmpty)
            Center(child: Text('No audits yet', style: TextStyle(color: Colors.grey[600])))
          else
            ..._audits.map((audit) => _auditCard(audit)).toList(),
        ],
      ),
    );
  }

  Widget _auditCard(Audit audit) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey[200]!)),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(audit.id, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: RIQABAHColors.green700)),
                const SizedBox(height: 4),
                Text(audit.title, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: audit.status == 'Completed' ? Colors.green[50] : Colors.orange[50],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(audit.status, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: audit.status == 'Completed' ? Colors.green : Colors.orange)),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(Icons.edit, size: 18, color: Colors.blue),
            onPressed: () => _showAuditDialog(audit: audit),
          ),
          IconButton(
            icon: const Icon(Icons.delete, size: 18, color: Colors.red),
            onPressed: () => _confirmDelete(audit),
          ),
        ],
      ),
    );
  }

  void _showAuditDialog({Audit? audit}) {
    final titleController = TextEditingController(text: audit?.title ?? '');
    final statusController = TextEditingController(text: audit?.status ?? 'Pending');

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(audit == null ? T.get('add_audit', _lang) : T.get('edit_audit', _lang)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: InputDecoration(labelText: T.get('audit_title', _lang)),
            ),
            const SizedBox(height: 12),
            DropdownButtonFormField<String>(
              value: statusController.text,
              items: ['Pending', 'Completed', 'Ongoing']
                  .map((e) => DropdownMenuItem(value: e, child: Text(e)))
                  .toList(),
              onChanged: (v) => statusController.text = v ?? 'Pending',
              decoration: InputDecoration(labelText: T.get('audit_status', _lang)),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(T.get('cancel', _lang)),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                if (audit == null) {
                  _audits.add(Audit(
                    id: 'AUD-${DateTime.now().year}-${(_audits.length + 1).toString().padLeft(3, '0')}',
                    title: titleController.text,
                    status: statusController.text,
                  ));
                } else {
                  audit.title = titleController.text;
                  audit.status = statusController.text;
                }
              });
              Navigator.pop(context);
            },
            child: Text(T.get('save', _lang)),
          ),
        ],
      ),
    );
  }

  void _confirmDelete(Audit audit) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(T.get('delete_audit', _lang)),
        content: Text(T.get('confirm_delete', _lang)),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(T.get('cancel', _lang)),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() => _audits.remove(audit));
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: Text(T.get('delete_audit', _lang)),
          ),
        ],
      ),
    );
  }

  // ============ REPORTS ============
  Widget _buildReportsPage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(T.get('reports_title', _lang), style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text(T.get('reports_desc', _lang), style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(height: 16),
          _reportCard('RPT-2026-11-AUD-01', 'Audit Report', 'Nov 01 - Nov 15, 2026'),
          _reportCard('RPT-2026-11-CAPA-02', 'CAPA Verification', 'Nov 01 - Nov 15, 2026'),
          _reportCard('RPT-2026-10-AUD-06', 'Audit Report', 'Oct 2026'),
        ],
      ),
    );
  }

  Widget _reportCard(String id, String type, String period) {
    final isAudit = type.contains('Audit');
    final color = isAudit ? RIQABAHColors.green700 : Colors.blue;
    final icon = isAudit ? Icons.assignment : Icons.verified;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.grey[200]!),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 8, offset: const Offset(0, 2))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                child: Icon(icon, color: color, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(id, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w800, color: color)),
                    const SizedBox(height: 2),
                    Text(type, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              const Icon(Icons.calendar_today, size: 12, color: Colors.grey),
              const SizedBox(width: 6),
              Text(period, style: const TextStyle(fontSize: 11, color: Colors.grey)),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () => _showSignatureDialog(id, type, period),
                  icon: const Icon(Icons.edit, size: 14),
                  label: const Text('Sign & Download', style: TextStyle(fontSize: 11)),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: RIQABAHColors.green700,
                    side: const BorderSide(color: RIQABAHColors.green700),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () => _sendToCommander(id),
                  icon: const Icon(Icons.send, size: 14),
                  label: const Text('Send', style: TextStyle(fontSize: 11)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: RIQABAHColors.green700,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // ============ SIGNATURE DIALOG ============
  void _showSignatureDialog(String id, String type, String period) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setModalState) {
            return Container(
              height: MediaQuery.of(context).size.height * 0.8,
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Text(T.get('signature_title', _lang), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
                  const SizedBox(height: 16),
                  Container(
                    height: 200,
                    decoration: BoxDecoration(border: Border.all(color: Colors.grey), borderRadius: BorderRadius.circular(8), color: Colors.white),
                    child: Signature(
                      controller: _signatureController,
                      height: 200,
                      backgroundColor: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: () {
                            _signatureController.clear();
                            setModalState(() {});
                          },
                          icon: const Icon(Icons.delete, size: 14),
                          label: Text(T.get('signature_clear', _lang)),
                          style: OutlinedButton.styleFrom(foregroundColor: Colors.red, side: const BorderSide(color: Colors.red)),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: ElevatedButton.icon(
                          onPressed: () => _uploadSignatureImage(setModalState),
                          icon: const Icon(Icons.upload, size: 14),
                          label: Text(T.get('signature_upload', _lang)),
                          style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    width: double.infinity,
                    height: 46,
                    child: FilledButton(
                      onPressed: () async {
                        final signature = await _signatureController.toPngBytes();
                        if (signature == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text(T.get('signature_required', _lang))),
                          );
                          return;
                        }
                        setState(() => _signatureBytes = signature);
                        Navigator.pop(context);
                        _downloadPdf(id, type, period, signature);
                      },
                      child: Text(T.get('signature_save', _lang)),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Future<void> _uploadSignatureImage(StateSetter setModalState) async {
    final picker = ImagePicker();
    final file = await picker.pickImage(source: ImageSource.gallery);
    if (file != null) {
      final bytes = await file.readAsBytes();
      setState(() => _signatureBytes = bytes);
      setModalState(() {});
    }
  }

  // ============ PDF ============
  Future<void> _downloadPdf(String reportId, String type, String period, Uint8List signatureBytes) async {
    final pdf = pw.Document();
    final image = await imageFromAssetBundle('assets/logo/mobile_auditor_logo.png');
    final signatureImage = pw.MemoryImage(signatureBytes);

    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.start,
            children: [
              // Header dengan logo
              pw.Row(
                crossAxisAlignment: pw.CrossAxisAlignment.center,
                children: [
                  pw.Image(image, width: 100),
                  pw.SizedBox(width: 16),
                  pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.start,
                    children: [
                      pw.Text('RIQABAH OPERATIONS REPORT',
                          style: pw.TextStyle(
                              fontSize: 18,
                              fontWeight: pw.FontWeight.bold,
                              color: PdfColors.green900)),
                      pw.Text('Saudi Halal Slaughter Intelligence',
                          style: const pw.TextStyle(fontSize: 11, color: PdfColors.grey700)),
                    ],
                  ),
                ],
              ),
              pw.SizedBox(height: 10),
              pw.Divider(color: PdfColors.green800, thickness: 2),
              pw.SizedBox(height: 16),
              pw.Text('Report ID: $reportId', style: const pw.TextStyle(fontSize: 12)),
              pw.Text('Type: $type', style: const pw.TextStyle(fontSize: 12)),
              pw.Text('Period: $period', style: const pw.TextStyle(fontSize: 12)),
              pw.SizedBox(height: 20),
              pw.TableHelper.fromTextArray(
                headers: ['ID', 'Type', 'Period', 'Status'],
                data: [
                  [reportId, type, period, 'Compliant'],
                ],
                headerStyle: pw.TextStyle(fontWeight: pw.FontWeight.bold, color: PdfColors.white),
                headerDecoration: const pw.BoxDecoration(color: PdfColors.green800),
                cellAlignment: pw.Alignment.centerLeft,
              ),
              pw.SizedBox(height: 40),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.center,
                    children: [
                      pw.Text('Halal Auditor', style: pw.TextStyle(fontSize: 11, fontWeight: pw.FontWeight.bold)),
                      pw.SizedBox(height: 10),
                      pw.Image(signatureImage, width: 120, height: 60),
                      pw.Divider(color: PdfColors.black, thickness: 1),
                      pw.SizedBox(height: 4),
                      pw.Text('Azwar Riyadh Subarkah', style: pw.TextStyle(fontSize: 12, fontWeight: pw.FontWeight.bold)),
                      pw.Text('Halal Auditor, RIQABAH', style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey700)),
                    ],
                  ),
                  pw.Column(
                    crossAxisAlignment: pw.CrossAxisAlignment.center,
                    children: [
                      pw.Text('Approved By', style: pw.TextStyle(fontSize: 11, fontWeight: pw.FontWeight.bold)),
                      pw.SizedBox(height: 70),
                      pw.Divider(color: PdfColors.black, thickness: 1),
                      pw.SizedBox(height: 4),
                      pw.Text('RIQABAH Commander', style: pw.TextStyle(fontSize: 12, fontWeight: pw.FontWeight.bold)),
                      pw.Text('Halal Assurance Manager', style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey700)),
                    ],
                  ),
                ],
              ),
              pw.SizedBox(height: 30),
              pw.Divider(color: PdfColors.grey300, thickness: 1),
              pw.Row(
                mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                children: [
                  pw.Text('Generated: ${DateTime.now().toLocal()}', style: const pw.TextStyle(fontSize: 9, color: PdfColors.grey)),
                  pw.Text('RIQABAH Confidential', style: const pw.TextStyle(fontSize: 9, color: PdfColors.grey)),
                ],
              ),
            ],
          );
        },
      ),
    );
    await Printing.layoutPdf(onLayout: (PdfPageFormat format) async => pdf.save());
  }

  void _sendToCommander(String reportId) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('✅ $reportId sent to Commander (Admin-Web)!'),
        backgroundColor: RIQABAHColors.green700,
      ),
    );
  }

  // ============ PROFILE ============
  Widget _buildProfilePage() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          const SizedBox(height: 20),
          const CircleAvatar(
            radius: 50,
            backgroundColor: RIQABAHColors.green100,
            child: Text('AU', style: TextStyle(fontSize: 32, fontWeight: FontWeight.w800, color: RIQABAHColors.green800)),
          ),
          const SizedBox(height: 16),
          Text(T.get('profile_name', _lang), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800)),
          const SizedBox(height: 4),
          Text(T.get('role', _lang), style: const TextStyle(fontSize: 13, color: Colors.grey)),
          const SizedBox(height: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(color: Colors.green[50], borderRadius: BorderRadius.circular(20)),
            child: Row(mainAxisSize: MainAxisSize.min, children: [
              Container(width: 6, height: 6, decoration: const BoxDecoration(color: Colors.green, shape: BoxShape.circle)),
              const SizedBox(width: 6),
              Text(T.get('available', _lang), style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.green)),
            ]),
          ),
          const SizedBox(height: 32),
          _menuItem(Icons.settings_outlined, T.get('settings', _lang)),
          _menuItem(Icons.notifications_none, T.get('notifications', _lang)),
          _menuItem(Icons.logout, T.get('logout', _lang), color: Colors.red),
        ],
      ),
    );
  }

  Widget _menuItem(IconData icon, String label, {Color? color}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(12), border: Border.all(color: Colors.grey[200]!)),
      child: ListTile(
        leading: Icon(icon, color: color ?? RIQABAHColors.green700),
        title: Text(label, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: color)),
        trailing: const Icon(Icons.chevron_right, color: Colors.grey),
        onTap: () {},
      ),
    );
  }
}
