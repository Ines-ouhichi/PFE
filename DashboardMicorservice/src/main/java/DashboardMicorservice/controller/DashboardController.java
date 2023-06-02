package DashboardMicorservice.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import DashboardMicorservice.models.Dashboard;
import DashboardMicorservice.models.Visualisation;
import DashboardMicorservice.Repository.VisualisationRepository;
import DashboardMicorservice.Service.DashboardService;
import DashboardMicorservice.Service.VisualisationService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
	
	@Autowired
	DashboardService dashboardservice;
	@Autowired
	VisualisationService visualisationservice;
	@Autowired
	VisualisationRepository visualrepository;
	
	@RequestMapping(value = "/editDashboard", method = { RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST })
	public Dashboard editDashboard(@RequestBody Dashboard dashboard) throws IOException {
		Dashboard newDashboard = dashboardservice.findById(dashboard.getId()).get();
		dashboardservice.deleteById(dashboard.getId());
		newDashboard.setPortlets(dashboard.getVisuals());
		return dashboardservice.save(newDashboard);
	}

	@RequestMapping(value = "/deleteVisual/{Visualid}", method = {
			RequestMethod.DELETE, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST })

	public void deleteVisual(@PathVariable("Visualid") Long Visualid)
			throws  ParseException, IOException {
		visualisationservice.deleteById(Visualid);

	}
	
    @GetMapping("/Dashboards")
	//@RequestMapping(value = "/Dashboards", method = { RequestMethod.GET,RequestMethod.PUT, RequestMethod.POST })
	public Iterable<Dashboard> getAllAvailableDashboards() {
		List<Dashboard> result = new ArrayList<Dashboard>();
		Iterable<Dashboard> dashboards = dashboardservice.findAll();
		for (Dashboard dashboard : dashboards) {
			Iterable<Visualisation> visuals = visualrepository.findByDashboardId(dashboard.getId());
			dashboard.getVisuals().clear();
			for (Visualisation visual : visuals) {
				dashboard.getVisuals().add(visual);
			}

			result.add(dashboard);
		}

		return result;
	}
	
	
	@RequestMapping(value = "/saveDashboard", method = { RequestMethod.GET,RequestMethod.PUT, RequestMethod.POST })
	public Dashboard saveDashboard(@RequestBody Dashboard dashboard) {

		return dashboardservice.save(dashboard);

	}
	@RequestMapping(value = "/Dashboards/{dashboardId}", method = { RequestMethod.GET,RequestMethod.PUT, RequestMethod.POST })
	public Optional<Dashboard> getDashboardById(@PathVariable long dashboardId) {
		return dashboardservice.findById(dashboardId);

	}
	
	 @PostMapping( "/saveNewVisual")
		public void saveNewVisual(@RequestBody Visualisation newVisual) throws  ParseException, IOException {
			//Visualisation  visual = new Visualisation(newVisual.getId(),newVisual.getTitre(),newVisual.getDescription(),newVisual.getIndexName(),newVisual.getChartType(),newVisual.getDateInterval(),newVisual.getXaxis(),newVisual.getYaxis(),newVisual.getHeight(),newVisual.getWidth(),newVisual.getxPos(),newVisual.getyPos());
			Visualisation  visual = new Visualisation(newVisual.getTitre(),newVisual.getChartType());
			Dashboard d = dashboardservice.findById((newVisual.getDashboardId())).get();
			List<Visualisation> interPortlets = d.getVisuals();
			interPortlets.add(visual);
			d.setPortlets(interPortlets);
			dashboardservice.save(d);

		}
	
}
