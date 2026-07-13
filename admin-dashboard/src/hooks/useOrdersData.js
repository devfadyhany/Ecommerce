import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { showErrorToast } from "../utils/toastHelpers";

export function useOrdersData({ page = 1, limit = 10, status, paymentStatus }) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => setRefetchIndex((i) => i + 1), []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = { page, limit };
        if (status) params.status = status;
        if (paymentStatus) params.paymentStatus = paymentStatus;

        const res = await api.get("/orders/admin", { params });

        setOrders(res.data.orders || []);
        setTotal(res.data.total || 0);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err);
        showErrorToast("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, limit, status, paymentStatus, refetchIndex]);

  return { orders, total, totalPages, loading, error, refetch };
}