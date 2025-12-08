const API_BASE_URL = "http://localhost:5000";

const apiFetch = async (url, method = "GET", body = null) => {
    const headers = {
        "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "API Error");
    }

    return data;
};


export const authApi = {

    async login(body) {
        const data = await apiFetch("/api/auth/login", "POST", body);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    },


    async getAllUsers() {
        const data = await apiFetch("/api/auth/users", "GET");
        return data;
    },

    async signup(body) {
        const data = await apiFetch("/api/auth/signup", "POST", body);
        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    },

    async adminSignup(body, setupSecret) {
        const headers = {};
        if (setupSecret) {
            headers['x-admin-setup-secret'] = setupSecret;
        }

        // Custom apiFetch call to inject headers
        const token = localStorage.getItem("token");
        const requestHeaders = {
            "Content-Type": "application/json",
            ...headers
        };
        if (token) requestHeaders["Authorization"] = `Bearer ${token}`;

        const response = await fetch(`${API_BASE_URL}/api/auth/admin/signup`, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify(body),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "API Error");
        }

        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        return data;
    },

    async logout() {
        localStorage.removeItem("token");
        return apiFetch("/api/auth/logout", "POST");
    },

    async getCurrentUser() {
        return apiFetch("/api/auth/profile", "GET");
    },

    async forgotPassword(body) {
        return apiFetch("/api/auth/forgot-password", "POST", body);
    },

    async resetPassword(body) {
        return apiFetch("/api/auth/reset-password", "POST", body);
    },

    async changePassword(body) {
        return apiFetch("/api/auth/change-password", "POST", body);
    },

    async verifyOtp(body) {
        return apiFetch("/api/auth/verify-otp", "POST", body);
    },

    async resendOtp(body) {
        return apiFetch("/api/auth/resend-otp", "POST", body);
    },

    async updateProfile(body) {
        return apiFetch("/api/auth/update-profile", "POST", body);
    },

    async updatePassword(body) {
        return apiFetch("/api/auth/update-password", "POST", body);
    },

    async updateEmail(body) {
        return apiFetch("/api/auth/update-email", "POST", body);
    },
}

export const vehicleApi = {

    async getVehicles() {
        return apiFetch("/api/vehicle", "GET");
    },

    async lookupByRego(state, rego) {

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            id: 'mock-vehicle-id',
            name: 'Holden Commodore',
            details: '2018 Petrol Automatic 3.6 Litres ZB'
        };
    },

    async getAllVehicles() {
        return apiFetch("/api/vehicle", "GET");
    },

    async getVehicleById(id) {
        return apiFetch(`/api/vehicle/${id}`, "GET");
    },

    async createVehicle(body) {
        return apiFetch("/api/vehicle", "POST", body);
    },

    async updateVehicle(id, body) {
        return apiFetch(`/api/vehicle/${id}`, "PUT", body);
    },

    async deleteVehicle(id) {
        return apiFetch(`/api/vehicle/${id}`, "DELETE");
    },

}

export const bookingApi = {

    async getBookings() {
        return apiFetch("/api/booking", "GET");
    },

    async getBookingById(id) {
        return apiFetch(`/api/booking/${id}`, "GET");
    },

    async createBooking(body) {
        return apiFetch("/api/booking", "POST", body);
    },

    async updateBooking(id, body) {
        return apiFetch(`/api/booking/${id}`, "PUT", body);
    },

    async deleteBooking(id) {
        return apiFetch(`/api/booking/${id}`, "DELETE");
    },

    async bookingHistory() {
        return apiFetch("/api/booking/history", "GET");
    },
}

export const contactApi = {
    async getAllContacts() {
        return apiFetch("/api/contact", "GET");
    },

    async sendContactForm(body) {
        return apiFetch("/api/contact", "POST", body);
    },

    async updateContactStatus(id, status) {
        return apiFetch(`/api/contact/${id}`, "PUT", { status });
    },
}

export const homeServiceApi = {
    async createHomeService(body) {
        return apiFetch("/api/home-service", "POST", body);
    },

    async getAllHomeServices() {
        return apiFetch("/api/home-service", "GET");
    },

    async getHomeServiceById(id) {
        return apiFetch(`/api/home-service/${id}`, "GET");
    },

    async updateHomeService(id, body) {
        return apiFetch(`/api/home-service/${id}`, "PUT", body);
    },

    async deleteHomeService(id) {
        return apiFetch(`/api/home-service/${id}`, "DELETE");
    },
}

export const mechanicApi = {
    async getAllMechanics() {
        return apiFetch("/api/mechanics", "GET");
    },

    async getMechanicById(id) {
        return apiFetch(`/api/mechanics/${id}`, "GET");
    },

    async getMechanicReviews(id) {
        return apiFetch(`/api/mechanics/${id}/reviews`, "GET");
    },

    async registerMechanic(body) {
        return apiFetch("/api/mechanics", "POST", body);
    },

    async updateMechanic(id, body) {
        return apiFetch(`/api/mechanics/${id}`, "PUT", body);
    },

    async getMechanicBookings(id) {
        return apiFetch(`/api/mechanics/${id}/bookings`, "GET");
    },

    async updateMechanicStatus(id, status) {
        return apiFetch(`/api/mechanics/${id}/status`, "PUT", { status });
    },

    async deleteMechanic(id) {
        return apiFetch(`/api/mechanics/${id}`, "DELETE");
    },
}

export const quoteApi = {
    async requestQuote(body) {
        return apiFetch("/api/quote", "POST", body);
    },

    async getUserQuotes() {
        return apiFetch("/api/quote/user", "GET");
    },

    async getMechanicQuotes() {
        return apiFetch("/api/quote/mechanic", "GET");
    },

    async respondToQuote(id, body) {
        return apiFetch(`/api/quote/${id}/respond`, "PUT", body);
    },

    async acceptQuote(id) {
        return apiFetch(`/api/quote/${id}/accept`, "PUT");
    },

    async rejectQuote(id) {
        return apiFetch(`/api/quote/${id}/reject`, "PUT");
    },
}

export const reviewApi = {
    async getAllReviews() {
        return apiFetch("/api/review", "GET");
    },

    async getReviewsByMechanic(mechanicId) {
        return apiFetch(`/api/review/mechanic/${mechanicId}`, "GET");
    },

    async createReview(body) {
        return apiFetch("/api/review", "POST", body);
    },

    async getUserReviews() {
        return apiFetch("/api/review/user", "GET");
    },

    async mechanicResponse(id, body) {
        return apiFetch(`/api/review/${id}/respond`, "POST", body);
    },
}

export const carServiceApi = {
    async getAllServices(params) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch(`/api/services${queryString}`, "GET");
    },

    async getServiceBySlug(slug) {
        return apiFetch(`/api/services/${slug}`, "GET");
    },

    async createService(body) {
        return apiFetch("/api/services", "POST", body);
    },

    async updateService(id, body) {
        return apiFetch(`/api/services/${id}`, "PUT", body);
    },

    async deleteService(id) {
        return apiFetch(`/api/services/${id}`, "DELETE");
    },

    async getCompatibleServices(body) {
        return apiFetch("/api/services/compatible", "POST", body);
    }
}

export const carSubServiceApi = {
    async getAllSubServices() {
        return apiFetch("/api/services/sub-services", "GET");
    },

    async getSubServicesByServiceId(serviceId) {
        return apiFetch(`/api/services/sub-services/service/${serviceId}`, "GET");
    },

    async getSubServiceById(id) {
        return apiFetch(`/api/services/sub-services/${id}`, "GET");
    },

    async createSubService(body) {
        return apiFetch("/api/services/sub-services", "POST", body);
    },

    async updateSubService(id, body) {
        return apiFetch(`/api/services/sub-services/${id}`, "PUT", body);
    },

    async deleteSubService(id) {
        return apiFetch(`/api/services/sub-services/${id}`, "DELETE");
    },

    async getCompatibleSubServices(body) {
        return apiFetch("/api/services/sub-services/compatible", "POST", body);
    }
}

export const b2bApi = {
    async register(body) {
        return apiFetch("/api/b2b/register", "POST", body);
    },

    async getAllProposals() {
        return apiFetch("/api/b2b", "GET");
    },

    async updateStatus(id, status) {
        return apiFetch(`/api/b2b/${id}/status`, "PUT", { status });
    },

    async getProposalById(id) {
        return apiFetch(`/api/b2b/${id}`, "GET");
    },

    async deleteProposal(id) {
        return apiFetch(`/api/b2b/${id}`, "DELETE");
    },
}

export const vehicleCompanyApi = {
    async getAllCompanies() {
        return apiFetch("/api/brands/vehicle-brands", "GET");
    },

    async getCompanyById(id) {
        return apiFetch(`/api/brands/vehicle-brands/${id}`, "GET");
    },

    async createCompany(body) {
        return apiFetch("/api/brands/vehicle-brands", "POST", body);
    },

    async updateCompany(id, body) {
        return apiFetch(`/api/brands/vehicle-brands/${id}`, "PUT", body);
    },

    async deleteCompany(id) {
        return apiFetch(`/api/brands/vehicle-brands/${id}`, "DELETE");
    },
}

export const vehicleModelApi = {
    async getModelsByCompany(makeId) {
        return apiFetch(`/api/brands/vehicle-models/brand/${makeId}`, "GET");
    },

    async getModelById(id) {
        return apiFetch(`/api/brands/vehicle-models/${id}`, "GET");
    },

    async createModel(body) {
        // Handle FormData for image upload
        if (body instanceof FormData) {
            const token = localStorage.getItem("token");
            const headers = token ? { "Authorization": `Bearer ${token}` } : {};

            const response = await fetch(`${API_BASE_URL}/api/brands/vehicle-models`, {
                method: "POST",
                headers,
                body
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "API Error");
            return data;
        }
        return apiFetch("/api/brands/vehicle-models", "POST", body);
    },

    async updateModel(id, body) {
        // Handle FormData for image upload
        if (body instanceof FormData) {
            const token = localStorage.getItem("token");
            const headers = token ? { "Authorization": `Bearer ${token}` } : {};

            const response = await fetch(`${API_BASE_URL}/api/brands/vehicle-models/${id}`, {
                method: "PUT",
                headers,
                body
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "API Error");
            return data;
        }
        return apiFetch(`/api/brands/vehicle-models/${id}`, "PUT", body);
    },

    async deleteModel(id) {
        return apiFetch(`/api/brands/vehicle-models/${id}`, "DELETE");
    },
}

export const serviceIntervalApi = {
    async createInterval(body) {
        return apiFetch("/api/brands/service-intervals", "POST", body);
    },

    async getAllIntervals() {
        return apiFetch("/api/brands/service-intervals", "GET");
    },

    async getIntervalsByModel(modelId) {
        return apiFetch(`/api/brands/service-intervals/model/${modelId}`, "GET");
    },

    async getIntervalById(id) {
        return apiFetch(`/api/brands/service-intervals/${id}`, "GET");
    },

    async updateInterval(id, body) {
        return apiFetch(`/api/brands/service-intervals/${id}`, "PUT", body);
    },

    async deleteInterval(id) {
        return apiFetch(`/api/brands/service-intervals/${id}`, "DELETE");
    },
}

export const carDataApi = {
    async getMakes() {
        return apiFetch("/api/cardata/makes", "GET");
    },
    async getModels(make) {
        return apiFetch(`/api/cardata/models/${make}`, "GET");
    }
}
