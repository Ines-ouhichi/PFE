package DashboardMicorservice.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
@Table(name = "Dashboard")
public class Dashboard  implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private long id;
	
	@Column(name = "name")
	private String name;
	
	
	@Column(name = "description")
	private String description;
	
	
	@OneToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "Dashboard_Visual", joinColumns = {
			@JoinColumn(name = "dashboard_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "visuals_id", referencedColumnName = "id") })
	private List<Visualisation> visualisations;
	
	public Dashboard(String name, String description) {

		this.name = name;
		this.description = description;
	}

	
	public Dashboard() {
	}

	public Dashboard(long id, String name, String description, List<Visualisation> visualisations) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.visualisations = visualisations;
	}

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}



	public List<Visualisation> getVisuals() {
		return visualisations;
	}

	public void setPortlets(List<Visualisation> visualisations) {
		this.visualisations = visualisations;
	}

	

	

}
