const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    const url = `${API_BASE_URL}${endpoint}`;

    const isFormData = options.body instanceof FormData;

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "true",
        ...(!isFormData && { "Content-Type": "application/json" }),
      },
      ...options,
    };

    if (config.body && !isFormData && typeof config.body !== "string") {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);

    if (response.status === 401) {
      const publicEndpoints = [
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/activate-account",
      ];
      const isPublicEndpoint = publicEndpoints.some((ep) =>
        endpoint.includes(ep)
      );

      if (isPublicEndpoint) {
        let errorMessage = "Invalid credentials";
        try {
          const errData = await response.json();
          errorMessage = errData.message || errorMessage;
        } catch { }
        throw new Error(errorMessage);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("token_expiry");

        window.location.href = "/login";
        throw new Error("Session expired. Please login again.");
      }
    }

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorDetails = null;

      try {
        const errData = await response.json();
        errorDetails = errData;
        errorMessage = errData.message || errorMessage;
      } catch { }

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { success: true, message: "Request berhasil!" };
    }

    return response.json();
  }

  async getCurrentUser() {
    return this.request("/auth/me");
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

  async listUser(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/users/list?${query}`);
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

  async getDivisionById(id) {
    return this.request(`/divisions/${id}`);
  }

  async createDivision(data) {
    return this.request("/divisions", {
      method: "POST",
      body: data,
    });
  }

  async deleteDivision(id) {
    return this.request(`/divisions/${id}`, {
      method: "DELETE",
    });
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
  async getReservations(page = 1) {
    return this.request(`/meeting-room-reservations?page=${page}`);
  }

  async getReservationsAll() {
    return this.request(`/meeting-room-reservations?all=${false}`);
  }

  async getReservationsByRoom(roomId) {
    return this.request(`/meeting-room-reservations/${roomId}`);
  }

  async getReservationsById(id) {
    return this.request(`/meeting-room-reservations/${id}`);
  }

  async createReservation(data) {
    console.log(data);
    return this.request("/meeting-room-reservations", {
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

  //REQUEST RESERVATION
  async getMeetingRequest(params = {}) {
    const queryParams = new URLSearchParams();

    const finalParams = {
      period: 'all',
      ...params
    };
    Object.keys(finalParams).forEach(key => {
      const value = finalParams[key];

      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/meeting-requests${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  async getMeetingRequestDetail(id) {
    return this.request(`/meeting-requests/${id}`)
  }

  async updateRequestStatus(id, status, rejection_reason) {
    const body = { status };

    if (rejection_reason) {
      body.rejection_reason = rejection_reason
    }

    return this.request(`/meeting-requests/${id}/status`, {
      method: "PUT",
      body: body,
    });
  }

  async deleteMeetingRequest(id) {
    return this.request(`/meeting-requests/${id}`, {
      method: "DELETE",
    });
  }

  //DISPLAY RESERVATION
  async displayReservation(companyCode, filter = "?filter=year") {
    const url = `/meeting-display/${companyCode}${filter}`;
    return this.request(url, {
      method: "GET",
    });
  }

  async searchMeetingRooms(payload) {
    return this.request(`/meeting-rooms/search?${payload}`, {
      method: "POST",
      body: payload,
    });
  }

  async getAvailableSlots(payload) {
    return this.request(`/meeting-rooms/search`, {
      method: "POST",
      body: payload,
    });
  }

}

export default new ApiService();
