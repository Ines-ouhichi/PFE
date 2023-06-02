package DashboardMicorservice.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import DashboardMicorservice.models.Dashboard;
import DashboardMicorservice.Service.DashboardService;
import DashboardMicorservice.Service.VisualisationService;
import DashboardMicorservice.models.Visualisation;
import jakarta.ws.rs.PathParam;

@RestController
@RequestMapping("/api/visualisations")
@CrossOrigin(origins ="http://localhost:4200")

public class VisualisationController {
    @Autowired
     VisualisationService visualisationservice;
    @Autowired
    DashboardService dashboardservice;
    
    @GetMapping
    public  Iterable<Visualisation> getAllVisuals() {
        return visualisationservice.findAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Visualisation> getVisualById(@PathVariable Long id) {
        return visualisationservice.findById(id);
    }
    
    @GetMapping("/get/{titre}")
    public Optional<Visualisation> getVisualByTitre(@PathVariable String titre) {
        return visualisationservice.findByTitre(titre);
    }
    
    /*@PostMapping("/save")
    public Visualisation createChart(@RequestParam("chartType") Visualisation visual,@RequestParam("titre") String titre) {
        return visualisationservice.save(visual);
    }*/
    
    @PostMapping("/save")
    public Visualisation createChart(@RequestBody Visualisation visual) {
        return visualisationservice.save(visual);
    }
    
    
    @DeleteMapping("/{id}")
    public void deleteChart(@PathVariable Long id) {
    	visualisationservice.deleteById(id);
    }

    @PostMapping( "/saveNewVisual/{DashId}")
	public void saveNewVisual(@RequestBody Visualisation newVisual,@PathVariable("DashId") Long dashboardId) throws  ParseException, IOException {
		//Visualisation  visual = new Visualisation(newVisual.getId(),newVisual.getTitre(),newVisual.getDescription(),newVisual.getIndexName(),newVisual.getChartType(),newVisual.getDateInterval(),newVisual.getXaxis(),newVisual.getYaxis(),newVisual.getHeight(),newVisual.getWidth(),newVisual.getxPos(),newVisual.getyPos());
	//	Visualisation  visual = new Visualisation(newVisual.getTitre(),newVisual.getChartType(),dashboardId);
    	Visualisation visual = visualisationservice.findById(newVisual.getId()).orElse(null);
    	visual.setDashboardId(dashboardId);
    	visualisationservice.save(visual);
		Dashboard d = dashboardservice.findById(dashboardId).get();
		List<Visualisation> interPortlets = d.getVisuals();
		interPortlets.add(visual);
		d.setPortlets(interPortlets);
		dashboardservice.save(d);

	}
	
    
    @PutMapping("/{id}/updateDashboardId/{dashboardId}")
    public ResponseEntity<String> updateDashboardId(@PathVariable("id") long visualisationId, @PathVariable("dashboardId") long dashboardId) {
        try {
        	visualisationservice.updateDashboardId(visualisationId, dashboardId);
            return ResponseEntity.ok("Dashboard ID updated successfully for visualization with ID: " + visualisationId);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update dashboard ID for visualization with ID: " + visualisationId);
        }
    }
	

}
