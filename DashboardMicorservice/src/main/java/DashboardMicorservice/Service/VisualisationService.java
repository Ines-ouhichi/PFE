package DashboardMicorservice.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DashboardMicorservice.Repository.VisualisationRepository;
import DashboardMicorservice.models.Dashboard;
import DashboardMicorservice.models.Visualisation;
import jakarta.ws.rs.NotFoundException;

@Service
public class VisualisationService {
	
	@Autowired
	VisualisationRepository visualisationRepository;
	
	public Optional<Visualisation> findById(Long visualId){
		return visualisationRepository.findById(visualId);
		
	}
	
	public Optional<Visualisation> findByTitre(String titre){
		return visualisationRepository.findVisualByTitre(titre);
		
	}
	
	public Visualisation save(Visualisation visual) {
		return visualisationRepository.save(visual);
	}
	
	public  Iterable<Visualisation> findAll(){
		return visualisationRepository.findAll();
	}
	
	public void deleteById(long visualId) {
		visualisationRepository.deleteById(visualId);

	}
	public void updateDashboardId(long visualisationId, long dashboardId) {
        Optional<Visualisation> optionalVisualisation = visualisationRepository.findById(visualisationId);
        
        if (optionalVisualisation.isPresent()) {
            Visualisation visualisation = optionalVisualisation.get();
            visualisation.setDashboardId(dashboardId);
            visualisationRepository.save(visualisation);
        } else {
            throw new NotFoundException("Visualisation not found with ID: " + visualisationId);
        }
    }







	
	

}
