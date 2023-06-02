package DashboardMicorservice.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import DashboardMicorservice.Repository.DashboardRepository;
import DashboardMicorservice.models.Dashboard;
import DashboardMicorservice.models.Visualisation;

@Service
public class DashboardService {
	
	@Autowired
	DashboardRepository dashboardrepository;
	
	public Optional<Dashboard> findById(Long dashboardId){
		return dashboardrepository.findById(dashboardId);
	}
	
	public Dashboard save(Dashboard dashboard) {
		return dashboardrepository.save(dashboard);
	
	}
	
	public  Iterable<Dashboard> findAll(){
		return dashboardrepository.findAll();
	}
	
	public void deleteById(long dashboardId) {
		dashboardrepository.deleteById(dashboardId);

	}
/*public Iterable<Visualisation>GetAllVisuals(Long DashboardId){
	
	
	
}*/
	 
	

}
