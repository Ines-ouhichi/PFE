package DataSource.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import DataSource.Model.Transactions;
import DataSource.Repository.RepositoryTransac;

@RestController
public class ControllerTransact {
	
	@Autowired
	private RepositoryTransac repositroy;
	
	
	@PostMapping("/saveTransaction")
    public Transactions saveEmployee(@RequestBody Transactions transaction) {
        System.out.println(transaction.toString());
        return repositroy.save(transaction);
    }
	
	@PostMapping("/saveTransactions")
    public int saveEmployee(@RequestBody List<Transactions> transactions) {
        System.out.println(transactions.toString());
        repositroy.saveAll(transactions);
        return transactions.size();
    }

	@GetMapping("/findEverything")
    public Iterable<Transactions> findAllTransactions() {
        return repositroy.findAll();
    }
	
	@GetMapping("/findById/{transaction_id}")    

    public Optional<Transactions> findById(@PathVariable Long transaction_id) {
        return repositroy.findById(transaction_id);
    }
}
