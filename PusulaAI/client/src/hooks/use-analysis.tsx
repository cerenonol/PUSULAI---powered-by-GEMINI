import { useQuery } from "@tanstack/react-query";
import { AnalysisSession } from "@shared/schema";

export function useAnalysis(sessionId: string) {
  return useQuery({
    queryKey: ['/api/analysis', sessionId, 'status'],
    enabled: !!sessionId,
    refetchInterval: 2000, // Refetch every 2 seconds
    staleTime: 0, // Always consider data stale to ensure fresh updates
  });
}

export function useAnalysisResults(sessionId: string) {
  return useQuery({
    queryKey: ['/api/analysis', sessionId, 'results'],
    enabled: !!sessionId,
    retry: false, // Don't retry if results aren't ready yet
  });
}

export function useStudentReport(sessionId: string) {
  return useQuery({
    queryKey: ['/api/analysis', sessionId, 'student-report'],
    enabled: !!sessionId,
    retry: false,
  });
}

export function useParentReport(sessionId: string) {
  return useQuery({
    queryKey: ['/api/analysis', sessionId, 'parent-report'],
    enabled: !!sessionId,
    retry: false,
  });
}
