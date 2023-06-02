package DashboardMicorservice.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import DashboardMicorservice.models.Visualisation;

@Repository
public interface VisualisationRepository  extends CrudRepository<Visualisation, Long> {
	Iterable<Visualisation> findByDashboardId(long DashboardId);
	Optional<Visualisation> findVisualByTitre(String titre);


}
