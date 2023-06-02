package DashboardMicorservice.models;

import java.io.Serializable;


import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "Visualisation")
public class Visualisation implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id")
	private long id;


	private String titre;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "indexName")
	private String indexName;
	
	@Column(name = "chartType")
	private String chartType;
	
	@Column(name = "xaxis")
	public String xaxis;
	
	@Column(name = "yaxis")
	public String yaxis;
	
	@Column(name = "dateInterval")
	public String dateInterval;
	
	@Column(name = "height")
	private int height;

	@Column(name = "width")
	private int width;

	@Column(name = "xPos")
	private int xPos;
	
	@Column(name = "yPos")
	private int yPos;
	
	
	@JoinTable(name = "Dashboard_Visual", joinColumns = {
			@JoinColumn(name = "Visual_id", referencedColumnName = "id") }, inverseJoinColumns = {
					@JoinColumn(name = "Dashboard_id", referencedColumnName = "id") })
	private Dashboard dashboard;
	
	@Column(name = "dashboardId")
	private Long dashboardId;
	
	public Dashboard getDashboard() {
		return dashboard;
	}

	public void setDashboard(Dashboard dashboard) {
		this.dashboard = dashboard;
	}
	
	public Visualisation() {
        // Default constructor.
    }
	
	public Visualisation(long id, String titre, String description, String indexName, String chartType, String xaxis,
			String yaxis, String dateInterval,int height, int width, int xPos, int yPos,Long DashboardId,Dashboard dashbord) {
		super();
		this.id = id;
		this.titre = titre;
		this.description = description;
		this.indexName = indexName;
		this.chartType = chartType;
		this.xaxis = xaxis;
		this.yaxis = yaxis;
		this.dateInterval = dateInterval;
		this.height = height;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		this.dashboardId=DashboardId;
		this.dashboard=dashboard;
		
	}
	
	
	

	
	public Visualisation(String titre, String chartType, Long dashboardId) {
		super();
		this.titre = titre;
		this.chartType = chartType;
		this.dashboardId = dashboardId;
	}
	
	public Visualisation(String titre, String chartTyped) {
		super();
		this.titre = titre;
		this.chartType = chartType;
	}

	public Visualisation(long id, String titre, String description, String indexName, String chartType, String xaxis,
			String yaxis, String dateInterval,int height, int width, int xPos, int yPos) {
		super();
		this.id = id;
		this.titre = titre;
		this.description = description;
		this.indexName = indexName;
		this.chartType = chartType;
		this.xaxis = xaxis;
		this.yaxis = yaxis;
		this.dateInterval = dateInterval;
		this.height = height;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		
	}

	
	public Visualisation(long id, String titre, String description, String indexName, String chartType, String xaxis,
			String yaxis, String dateInterval,int height, int width, int xPos, int yPos,Dashboard dashbord) {
		super();
		this.id = id;
		this.titre = titre;
		this.description = description;
		this.indexName = indexName;
		this.chartType = chartType;
		this.xaxis = xaxis;
		this.yaxis = yaxis;
		this.dateInterval = dateInterval;
		this.height = height;
		this.width = width;
		this.xPos = xPos;
		this.yPos = yPos;
		this.dashboard=dashboard;
		
	}


	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public String getTitre() {
		return titre;
	}



	public void setTitre(String titre) {
		this.titre = titre;
	}



	public String getDescription() {
		return description;
	}



	public void setDescription(String description) {
		this.description = description;
	}



	public String getIndexName() {
		return indexName;
	}



	public void setIndexName(String indexName) {
		this.indexName = indexName;
	}



	public String getChartType() {
		return chartType;
	}



	public void setChartType(String chartType) {
		this.chartType = chartType;
	}



	public String getXaxis() {
		return xaxis;
	}



	public void setXaxis(String xaxis) {
		this.xaxis = xaxis;
	}



	public String getYaxis() {
		return yaxis;
	}



	public void setYaxis(String yaxis) {
		this.yaxis = yaxis;
	}



	public String getDateInterval() {
		return dateInterval;
	}



	public void setDateInterval(String dateInterval) {
		this.dateInterval = dateInterval;
	}



	public int getHeight() {
		return height;
	}



	public void setHeight(int height) {
		this.height = height;
	}



	public int getWidth() {
		return width;
	}



	public void setWidth(int width) {
		this.width = width;
	}



	public int getxPos() {
		return xPos;
	}



	public void setxPos(int xPos) {
		this.xPos = xPos;
	}



	public int getyPos() {
		return yPos;
	}



	public void setyPos(int yPos) {
		this.yPos = yPos;
	}



	public Long getDashboardId() {
		return dashboardId;
	}



	public void setDashboardId(Long dashboardId) {
		this.dashboardId = dashboardId;
	}
	
	
	
	
	
	

}
