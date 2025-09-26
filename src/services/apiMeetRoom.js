const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`
      },
      ...options,
    };

    if (config.body && typeof config.body !== 'string') {
      config.body = JSON.stringify(config.body);
    }

      const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  async getRooms() {
    return this.request('/meeting-room');
  }

  async getRoom(id) {
    return this.request(`/meeting-room/${id}`);
  }

  async createRoom(data) {
    return this.request('/meeting-room', {
      method: 'POST',
      body: data,
    });
  }

  async updateRoom(id, data) {
    return this.request(`/meeting-room/${id}`, {
      method: 'PUT',
      body: data,
    });
  }

  async deleteRoom(id) {
    return this.request(`/meeting-room/${id}`, {
      method: 'DELETE',
    });
  }

  async getReservations() {
    return this.request('/meeting-room/reservations');
  }

  async getReservationsByRoom(roomId) {
    return this.request(`/meeting-room-reservations/${roomId}`);
  }

  async createReservation(data) {
    return this.request('/meeting-room/reserv', {
      method: 'POST',
      body: data,
    });
  }

  async updateReservationStatus(id, status) {
    return this.request(`/meeting-room/${id}/status`, {
      method: 'PUT',
      body: { status },
    });
  }
}

export default new ApiService();