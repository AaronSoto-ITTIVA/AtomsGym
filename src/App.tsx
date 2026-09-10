import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { HomePage } from './pages/HomePage'
import { RoutinesPage } from './pages/RoutinesPage'
import { RoutineDetailPage } from './pages/RoutineDetailPage'
import { ExercisesPage } from './pages/ExercisesPage'
import { ExerciseDetailPage } from './pages/ExerciseDetailPage'
import { EquipmentPage } from './pages/EquipmentPage'
import { EquipmentDetailPage } from './pages/EquipmentDetailPage'
import { FavoritesPage } from './pages/FavoritesPage'
import { SearchPage } from './pages/SearchPage'
import { QRPage } from './pages/QRPage'
import { WorkoutPage } from './pages/WorkoutPage'
import { WorkoutCompletePage } from './pages/WorkoutCompletePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/routines" element={<RoutinesPage />} />
        <Route path="/routine/:id" element={<RoutineDetailPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
        <Route path="/equipment" element={<EquipmentPage />} />
        <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/workout/:id" element={<WorkoutPage />} />
        <Route path="/workout/:id/done" element={<WorkoutCompletePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
