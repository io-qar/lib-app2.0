import http from "../http-common";

class BookDataService {
	getAll() {
		return http.get(`/books`);
	}

	get(id) {
		return http.get(`/books/${id}`);
	}

	getRented() {
		return http.get(`/books/rented`);
	}

	create(data) {
		return http.post(`/books`, data);
	}

	update(id, data) {
		return http.put(`/books/${id}`, data);
	}

	delete(id) {
		return http.delete(`/books/${id}`);
	}

	deleteAll() {
		return http.delete(`/books`);
	}

	findByName(name) {
		return http.get(`/books?name=${name}`);
	}
}

export default new BookDataService();