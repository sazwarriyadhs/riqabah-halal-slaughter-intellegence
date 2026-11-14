import 'dart:convert';
import 'package:http/http.dart' as http;
import '../api/RIQABAH_api_config.dart';
import '../storage/RIQABAH_session_storage.dart';
import 'auth_models.dart';

class RIQABAHAuthException implements Exception {
  final String message;
  const RIQABAHAuthException(this.message);
  @override
  String toString() => message;
}

class RIQABAHAuthRepository {
  RIQABAHAuthRepository({RIQABAHSessionStorage? storage, http.Client? client})
      : _storage = storage ?? RIQABAHSessionStorage(),
        _client = client ?? http.Client();

  final RIQABAHSessionStorage _storage;
  final http.Client _client;

  Future<AuthMe> login({required String login, required String password}) async {
    final response = await _client.post(
      Uri.parse(RIQABAHApiConfig.endpoint('/api/v1/auth/login')),
      headers: const {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: jsonEncode({'login': login.trim(), 'password': password}),
    );

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw RIQABAHAuthException('Login failed: ${response.statusCode} - ${response.body}');
    }

    final data = jsonDecode(response.body);
    final token = data['access_token'] ?? data['token'];
    final refreshToken = data['refresh_token'] ?? '';
    final tokenType = data['token_type'] ?? 'Bearer';
    final expiresIn = data['expires_in'] ?? 900;

    if (token == null) throw const RIQABAHAuthException('No token received');

    // Simpan session dengan metode yang benar
    await _storage.saveSession(
      accessToken: token,
      refreshToken: refreshToken,
      tokenType: tokenType,
      expiresIn: expiresIn,
    );

    // Ambil profil user
    final meRes = await _client.get(
      Uri.parse(RIQABAHApiConfig.endpoint('/api/v1/auth/me')),
      headers: {'Authorization': 'Bearer $token', 'Accept': 'application/json'},
    );

    if (meRes.statusCode != 200) {
      throw RIQABAHAuthException('Failed to load profile: ${meRes.statusCode}');
    }
    final meData = jsonDecode(meRes.body);

    return AuthMe(
      userId: meData['user_id'] ?? 'unknown',
      organisationId: meData['organisation_id'] ?? '',
      roles: List<String>.from(meData['roles'] ?? []),
    );
  }
}

// Tambahan: Fungsi untuk mengambil summary dari API
class SummaryRepository {
  SummaryRepository({http.Client? client}) : _client = client ?? http.Client();
  final http.Client _client;

  Future<Map<String, dynamic>> fetchSummary(String token) async {
    final res = await _client.get(
      Uri.parse(RIQABAHApiConfig.endpoint('/api/v1/dashboard/summary')),
      headers: {'Authorization': 'Bearer ' + token, 'Accept': 'application/json'},
    );
    if (res.statusCode != 200) {
      throw RIQABAHAuthException('Failed to load summary: ${res.statusCode}');
    }
    final json = jsonDecode(res.body);
    return json['data'] ?? {};
  }
}
