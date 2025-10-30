const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

class ApiService {
  async request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...options,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);

  // Tangani error HTTP
  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errData = await response.json();
      errorMessage = errData.message || errorMessage;
    } catch {
      // Jika response bukan JSON
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  // Tangani response non-JSON (misal HTML redirect)
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return { success: true, message: "Email berhasil diverifikasi!" };
  }

  // Jika JSON, parse normal
  return response.json();
}

  //Auth
  async login(email, password) {
    return this.request("/login", {
      method: "POST",
      body: { email, password },
    });
  }

  async register(name, email, password, confirmPassword, company_name) {
    return this.request("/register/admin", {
      method: "POST",
      body: {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        company_name,
      },
    });
  }

  async verifyEmail(id, hash, expires, signature) {
    return this.request(
      `/verify-email/${id}/${hash}?expires=${expires}&signature=${signature}`,
      {
        method: "GET",
      }
    );
  }

  async logout() {
    return this.request("/logout", {
      method: "POST",
    });
  }

  async forgotPassword(email) {
    return this.request("/forgot-password", {
      method: "POST",
      body: { email },
    });
  }

  async resetPassword(email, otp, password, passwordConfirm) {
    return this.request("/reset-password", {
      method: "POST",
      body: {
        email,
        otp,
        password,
        password_confirmation: passwordConfirm,
      },
    });
  }

  //USER
  async getUsers() {
    return this.request("/users?with_deleted=true");
  }

  async getUser(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, data) {
    return this.request(`/users/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    });
  }

  //USER PROFILE
  async getUserProfiles() {
    return this.request("/user-profiles");
  }

  async getUserProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    return this.request(`/user-profile/${user.id}`);
  }

  async storeUserProfile(data) {
    return this.request("/user-profiles", {
      method: "POST",
      body: data,
    });
  }

  async updateUserProfile(id, data) {
    return this.request(`/user-profiles/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  //INVITE USER
  async InviteUser(employees) {
    return this.request("/invite-users", {
      method: "POST",
      body: {
        employees: employees,
      },
    });
  }

  //ACTIVE ACCOUNT
  async ActiveAccount(token, name, password, passwordConfirm) {
    return this.request("/activate-account?token=", {
      method: "POST",
      body: {
        token,
        name,
        password,
        password_confirmation: passwordConfirm,
      },
    });
  }

  //DIVISION
  async getDivisions() {
    return this.request("/divisions");
  }

  //POSITION
  async getPositions() {
    return this.request("/positions");
  }

  //MEETING ROOM
  async getRooms() {
    return this.request("/meeting-room");
  }

  async getRoomById(id) {
    return this.request(`/meeting-room/${id}`);
  }

  async createRoom(data) {
    return this.request("/meeting-room", {
      method: "POST",
      body: data,
    });
  }

  async updateRoom(id, data) {
    return this.request(`/meeting-room/${id}`, {
      method: "PUT",
      body: data,
    });
  }

  async deleteRoom(id) {
    return this.request(`/meeting-room/${id}`, {
      method: "DELETE",
    });
  }

  //RESERVATION MEETING ROOM
  async getReservations() {
    return this.request("/meeting-room-reservations");
  }

  async getReservationsByRoom(roomId) {
    return this.request(`/meeting-room-reservations/${roomId}`);
  }

  async getReservationsById(id) {
    return this.request(`/meeting-room-reservations/${id}`);
  }

  async createReservation(data) {
    return this.request("/meeting-room/reserv", {
      method: "POST",
      body: data,
    });
  }

  async updateReservationStatus(id, status) {
    return this.request(`/meeting-room-reservations/${id}/status`, {
      method: "PUT",
      body: { status },
    });
  }
}

export default new ApiService();
